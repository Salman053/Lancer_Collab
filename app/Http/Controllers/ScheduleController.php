<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Milestone;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $tasks = Task::where(function($q) use ($userId) {
                $q->where('user_id', $userId)
                  ->orWhereHas('project', fn($pq) => $pq->where('user_id', $userId));
            })
            ->whereNotNull('due_date')
            ->with('project')
            ->get()
            ->map(fn($task) => [
                'id' => 'task-' . $task->id,
                'title' => '[Task] ' . $task->title,
                'start' => $task->due_date->format('Y-m-d'),
                'type' => 'task',
                'project' => $task->project->title,
                'status' => $task->status,
                'color' => '#3b82f6', 
            ]);

        $milestones = Milestone::where(function($q) use ($userId) {
                $q->where('user_id', $userId)
                  ->orWhereHas('project', fn($pq) => $pq->where('user_id', $userId));
            })
            ->whereNotNull('due_date')
            ->with('project')
            ->get()
            ->map(fn($milestone) => [
                'id' => 'milestone-' . $milestone->id,
                'title' => '[Milestone] ' . $milestone->title,
                'start' => $milestone->due_date->format('Y-m-d'),
                'type' => 'milestone',
                'project' => $milestone->project->title,
                'status' => $milestone->status instanceof \UnitEnum ? $milestone->status->value : $milestone->status,
                'color' => '#a855f7', // purple-500
            ]);

        $events = $tasks->concat($milestones);

        return Inertia::render('freelancer/schedule/index', [
            'events' => $events,
        ]);
    }
}
