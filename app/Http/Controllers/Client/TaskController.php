<?php

namespace App\Http\Controllers\Client;

use App\Events\TaskCreated;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Notifications\ProjectNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        if ($project->client_id !== Auth::user()->client->id) {
            abort(403);
        }

        $task = Task::create([
            'project_id' => $project->id,
            'user_id' => $project->user_id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => 'pending',
            'priority' => $validated['priority'],
            'due_date' => $validated['due_date'],
        ]);

        broadcast(new TaskCreated($task))->toOthers();

        // Notify Freelancer
        if ($project->user) {
            $project->user->notify(new ProjectNotification([
                'title' => 'New Task Assigned',
                'message' => "The client has assigned a new task \"{$task->title}\" to project \"{$project->title}\".",
                'url' => route('freelancer.projects.show', $project->id),
                'project_id' => $project->id,
                'type' => 'info',
                'icon' => 'PlusCircle',
            ]));
        }

        return back()->with('success', 'Task assigned successfully.');
    }
}
