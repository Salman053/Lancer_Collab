<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function generate(Project $project)
    {
        if ($project->user_id !== Auth::id() && $project->client->account_id !== Auth::id()) {
            abort(403);
        }

        $project->load(['client', 'milestones', 'payments']);

        $pdf = Pdf::loadView('invoices.template', ['project' => $project]);

        return $pdf->download('invoice-project-' . $project->id . '.pdf');
    }
}
