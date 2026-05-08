<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectUpdate;
use App\Events\ProjectUpdateCreated;
use App\Events\ProjectUpdateDeleted;
use App\Events\DashboardUpdated;
use App\Notifications\ProjectNotification;
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
        
        $update = ProjectUpdate::create($validated);

        broadcast(new ProjectUpdateCreated($update))->toOthers();

        // Notify Client
        if ($project->client && $project->client->account) {
            $project->client->account->notify(new ProjectNotification([
                'title' => 'New Project Update',
                'message' => "A new update has been posted for project \"{$project->title}\".",
                'url' => route('client.projects.show', $project->id),
                'project_id' => $project->id,
                'type' => 'success',
                'icon' => 'History'
            ]));

            broadcast(new DashboardUpdated($project->client->account_id, 'updates'))->toOthers();
        }

        broadcast(new DashboardUpdated($project->user_id, 'updates'))->toOthers();

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

        $updateId = $update->id;
        $projectId = $update->project_id;
        
        $update->delete();

        broadcast(new ProjectUpdateDeleted($updateId, $projectId))->toOthers();

        return redirect()->back()->with('success', 'Update deleted successfully.');
    }
}
