<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $tasks = Task::where('user_id', $userId)
            ->whereNotNull('due_date')
            ->with('project')
            ->get()
            ->map(fn($task) => [
                'id' => 'task-' . $task->id,
                'title' => $task->title,
                'start' => $task->due_date->format('Y-m-d'),
                'type' => 'task',
                'project' => $task->project->title,
                'status' => $task->status,
            ]);

        $milestones = Milestone::where('user_id', $userId)
            ->whereNotNull('due_date')
            ->with('project')
            ->get()
            ->map(fn($milestone) => [
                'id' => 'milestone-' . $milestone->id,
                'title' => $milestone->title,
                'start' => $milestone->due_date->format('Y-m-d'),
                'type' => 'milestone',
                'project' => $milestone->project->title,
                'status' => $milestone->status,
            ]);

        $events = $tasks->concat($milestones);

        return Inertia::render('freelancer/schedule/index', [
            'events' => $events,
        ]);
    }
}
