<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Project;
use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::whereHas('project', function($query) {
            $query->where('user_id', Auth::id());
        })
        ->with(['project.client', 'milestone'])
        ->latest()
        ->get();

        return Inertia::render('freelancer/payments/index', [
            'payments' => $payments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'milestone_id' => 'nullable|exists:milestones,id',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|string',
            'status' => 'required|string',
            'transaction_id' => 'nullable|string',
            'notes' => 'nullable|string',
            'paid_at' => 'nullable|date',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        Payment::create($validated);

        return back()->with('success', 'Payment recorded successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $project = $payment->project;
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'method' => 'required|string',
            'status' => 'required|string',
            'transaction_id' => 'nullable|string',
            'notes' => 'nullable|string',
            'paid_at' => 'nullable|date',
        ]);

        $payment->update($validated);

        return back()->with('success', 'Payment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        if ($payment->project->user_id !== Auth::id()) {
            abort(403);
        }

        $payment->delete();

        return back()->with('success', 'Payment deleted successfully.');
    }

    public function generateReport()
    {
        $user = Auth::user();
        $query = Payment::query()->with(['project.client', 'milestone']);
        // dd($query->get());

        if ($user->role === \App\Enums\UserRoles::FREELANCER) {
            $query->whereHas('project', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        } elseif ($user->role === \App\Enums\UserRoles::CLIENT) {
            $query->whereHas('project', function ($q) use ($user) {
                if ($user->client) {
                    $q->where('client_id', $user->client->id);
                } else {
                    $q->whereRaw('1=0');
                }
            });
        } elseif ($user->role !== \App\Enums\UserRoles::ADMIN) {
            abort(403);
        }

        $payments = $query->orderBy('created_at', 'asc')->get();

        return $this->downloadPdf($payments, 'Overall Payments History Report');
    }

    public function generateProjectReport(Project $project)
    {
        // dd($project);
        $user = Auth::user();

        // Authorization
        if ($user->role === \App\Enums\UserRoles::FREELANCER) {
            if ($project->user_id !== $user->id) abort(403);
        } elseif ($user->role === \App\Enums\UserRoles::CLIENT) {
            if (!$user->client || $project->client_id !== $user->client->id) abort(403);
        } elseif ($user->role !== \App\Enums\UserRoles::ADMIN) {
            abort(403);
        }

        $payments = Payment::where('project_id', $project->id)
            ->with(['project.client', 'milestone'])
            ->orderBy('created_at', 'asc')
            ->get();

        return $this->downloadPdf($payments, "Payments Report - {$project->title}");
    }

    protected function downloadPdf($payments, $title)
    {

    // dd($payments);
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('invoices.payments_report', [
            'payments' => $payments,
            'user' => Auth::user(),
            'title' => $title
        ]);

        return $pdf->download(\Illuminate\Support\Str::slug($title) . '-' . now()->format('Y-m-d') . '.pdf');
    }
}
