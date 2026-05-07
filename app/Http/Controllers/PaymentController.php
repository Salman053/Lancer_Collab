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
}
