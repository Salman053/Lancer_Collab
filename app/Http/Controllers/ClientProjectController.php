<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientId = Auth::user()->client->id;
        $projects = \App\Models\Project::where('client_id', $clientId)->with('user')->latest()->get();

        return inertia('client/projects/index', [
            'projects' => $projects,
        ]);
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
            return redirect()->back()->with('error', 'Failed to create project: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(\App\Models\Project $project)
    {
        if ($project->client_id !== Auth::user()->client->id) {
            abort(403);
        }

        return inertia('client/projects/show', [
            'project' => $project->load([
                'user',
                'milestones',
                'files',
                'payments',
                'updates' => fn ($q) => $q->latest(),
                'messages' => fn ($q) => $q->with('sender')->oldest(),
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
            return redirect()->back()->with('error', 'Failed to update project: '.$e->getMessage());
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
            return redirect()->back()->with('error', 'Failed to delete project: '.$e->getMessage());
        }
    }
}
