<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function generate(Project $project)
    {
        $user = Auth::user();

        // Authorization
        if ($user->role === \App\Enums\UserRoles::FREELANCER) {
            if ($project->user_id !== $user->id) abort(403);
        } elseif ($user->role === \App\Enums\UserRoles::CLIENT) {
            if (!$user->client || $project->client_id !== $user->client->id) abort(403);
        } elseif ($user->role !== \App\Enums\UserRoles::ADMIN) {
            abort(403);
        }

        $project->load(['client', 'milestones', 'payments']);

        $pdf = Pdf::loadView('invoices.template', ['project' => $project]);

        return $pdf->download('invoice-project-'.$project->id.'.pdf');
    }
}
