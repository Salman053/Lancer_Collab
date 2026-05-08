<?php

namespace App\Http\Controllers;

use App\Events\DashboardUpdated;
use App\Events\TaskCreated;
use App\Events\TaskDeleted;
use App\Events\TaskUpdated;
use App\Models\Project;
use App\Models\Task;
use App\Notifications\ProjectNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())
            ->with(['project', 'milestone'])
            ->latest()
            ->get();

        return Inertia::render('freelancer/tasks/index', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'milestone_id' => 'nullable|exists:milestones,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'priority' => 'required|string',
            'due_date' => 'nullable|date',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $validated['user_id'] = Auth::id();

        $task = Task::create($validated);

        broadcast(new TaskCreated($task))->toOthers();

        // Notify Client
        $project->client->account->notify(new ProjectNotification([
            'title' => 'New Task Created',
            'message' => "A new task \"{$task->title}\" has been added to project \"{$project->title}\".",
            'url' => route('client.projects.show', $project->id),
            'project_id' => $project->id,
            'type' => 'info',
            'icon' => 'PlusCircle',
        ]));

        broadcast(new DashboardUpdated($project->client->account_id, 'tasks'))->toOthers();

        broadcast(new DashboardUpdated($project->user_id, 'tasks'))->toOthers();

        return back()->with('success', 'Task created successfully.');
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'priority' => 'required|string',
            'due_date' => 'nullable|date',
            'completed_at' => 'nullable|date',
        ]);

        if ($validated['status'] === 'completed' && ! $task->completed_at) {
            $validated['completed_at'] = now();
        }

        $task->update($validated);

        broadcast(new TaskUpdated($task))->toOthers();

        broadcast(new DashboardUpdated($task->project->user_id, 'tasks'))->toOthers();
        if ($task->project->client && $task->project->client->account_id) {
            broadcast(new DashboardUpdated($task->project->client->account_id, 'tasks'))->toOthers();
        }

        return back()->with('success', 'Task updated successfully.');
    }

    public function toggleComplete(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403);
        }

        $isCompleted = $task->status === 'completed';

        $task->update([
            'status' => $isCompleted ? 'pending' : 'completed',
            'is_completed' => ! $isCompleted,
            'completed_at' => $isCompleted ? null : now(),
        ]);

        broadcast(new TaskUpdated($task))->toOthers();

        return back()->with('success', 'Task status updated.');
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403);
        }

        $taskId = $task->id;
        $projectId = $task->project_id;

        $task->delete();

        broadcast(new TaskDeleted($taskId, $projectId))->toOthers();

        broadcast(new DashboardUpdated($task->project->user_id, 'tasks'))->toOthers();
        if ($task->project->client && $task->project->client->account_id) {
            broadcast(new DashboardUpdated($task->project->client->account_id, 'tasks'))->toOthers();
        }

        return back()->with('success', 'Task deleted successfully.');
    }
}
