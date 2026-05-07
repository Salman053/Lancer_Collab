<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MilestoneController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'amount' => 'nullable|numeric|min:0',
            'status' => 'nullable|string',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $validated['user_id'] = Auth::id();
        
        Milestone::create($validated);

        return redirect()->back()->with('success', 'Milestone created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Milestone $milestone)
    {
        if ($milestone->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'amount' => 'nullable|numeric|min:0',
            'status' => 'required|string',
        ]);

        if ($validated['status'] === 'completed' && $milestone->status !== 'completed') {
            $validated['completed_at'] = now();
        }

        $milestone->update($validated);

        return redirect()->back()->with('success', 'Milestone updated successfully.');
    }

    /**
     * Client approval or revision request.
     */
    public function clientUpdate(Request $request, Milestone $milestone)
    {
        $project = $milestone->project;
        $client = Auth::user()->client;

        if (!$client || $project->client_id !== $client->id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:completed,revision',
        ]);

        if ($validated['status'] === 'completed') {
            $milestone->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);
        } else {
            $milestone->update([
                'status' => 'revision',
            ]);
        }

        return redirect()->back()->with('success', 'Milestone status updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Milestone $milestone)
    {
        if ($milestone->user_id !== Auth::id()) {
            abort(403);
        }

        $milestone->delete();

        return redirect()->back()->with('success', 'Milestone deleted successfully.');
    }
}
