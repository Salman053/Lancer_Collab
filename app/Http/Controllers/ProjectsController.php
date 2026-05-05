<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('client')->latest()->get();
        $activeClients = Auth::user()->activeClients()->get();

        return inertia('freelancer/projects/index', [
            'projects' => $projects,
            'clients' => $activeClients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        try {
            Project::create($data);

            return redirect()->back()->with('success', 'Project created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create project: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return inertia('freelancer/projects/show', [
            'project' => $project->load('client', 'milestones'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        try {
            $project->update($data);

            return redirect()->back()->with('success', 'Project updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update project: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        try {
            $project->delete();

            return redirect()->back()->with('success', 'Project deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete project: '.$e->getMessage());
        }
    }
}
