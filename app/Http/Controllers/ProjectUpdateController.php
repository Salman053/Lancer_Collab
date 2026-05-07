<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectUpdateController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'message' => 'required|string',
            'visible_to_client' => 'boolean',
            'attachment_path' => 'nullable|string',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $validated['user_id'] = Auth::id();
        
        ProjectUpdate::create($validated);

        return redirect()->back()->with('success', 'Update posted successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectUpdate $update)
    {
        if ($update->user_id !== Auth::id()) {
            abort(403);
        }

        $update->delete();

        return redirect()->back()->with('success', 'Update deleted successfully.');
    }
}
