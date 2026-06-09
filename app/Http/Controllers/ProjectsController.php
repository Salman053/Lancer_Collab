<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller
{


    public function index()
    {
        $projects = Auth::user()->projects()->with('client')->latest()->get();

        return inertia('freelancer/projects/index', [
            'projects' => $projects,
        ]);
    }
    /**
     * Generate project documentation PDF.
     */
    public function generateDocumentation(Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $project->load([
            'client',
            'milestones',
            'tasks',
            'updates',
            'messages' => fn($q) => $q->with('sender')
        ]);

        $pdf = Pdf::loadView('reports.project-documentation', compact('project'));

        return $pdf->download("Project_Documentation_{$project->title}.pdf");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $activeClients = Auth::user()->activeClients()->get();

        return inertia('freelancer/projects/create', [
            'clients' => $activeClients,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        try {
            Project::create($data);

            return redirect()->route('freelancer.projects')->with('success', 'Project created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create project: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        return inertia('freelancer/projects/show', [
            'project' => $project->load([
                'client.account',
                'milestones',
                'files',
                'tasks',
                'updates' => fn($q) => $q->latest(),
                'messages' => fn($q) => $q->with('sender', 'receiver')->oldest()
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $activeClients = Auth::user()->activeClients()->get();

        return inertia('freelancer/projects/edit', [
            'project' => $project,
            'clients' => $activeClients,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        try {
            $project->update($data);

            return redirect()->route('freelancer.projects')->with('success', 'Project updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update project: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        try {
            $project->delete();

            return redirect()->route('freelancer.projects')->with('success', 'Project deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete project: ' . $e->getMessage());
        }
    }
}
