<?php

namespace App\Http\Controllers;

use App\Enums\MilestoneStatus;
use App\Enums\ProjectStatus;
use App\Models\Message;
use App\Models\Milestone;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $client = $user->client;

        if (! $client) {
            return Inertia::render('client/dashboard', [
                'activeProjectsCount' => 0,
                'unreadMessagesCount' => 0,
                'upcomingMilestones' => [],
                'recentActivity' => [],
            ]);
        }

        $projects = Project::where('client_id', $client->id)->get();
        $projectIds = $projects->pluck('id');

        $activeProjectsCount = $projects->whereIn('status', [
            ProjectStatus::COMPLETED,
            ProjectStatus::IN_PROGRESS,
            ProjectStatus::ON_HOLD,
        ])->count();

        $unreadMessagesCount = Message::whereIn('project_id', $projectIds)
            ->where('to_user_id', $user->id)
            ->whereNull('read_at')
            ->count();

        $upcomingMilestones = Milestone::whereIn('project_id', $projectIds)
            ->where('status', '!=', MilestoneStatus::COMPLETED)
            ->where('due_date', '>=', now())
            ->with('project')
            ->orderBy('due_date')
            ->limit(5)
            ->get();

        // For recent activity, we can combine updates and messages?
        // Or just show latest updates.
        $recentUpdates = ProjectUpdate::whereIn('project_id', $projectIds)
            ->where('visible_to_client', true)
            ->with(['project', 'user'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($update) {
                return [
                    'id' => $update->id,
                    'type' => 'update',
                    'title' => 'Project Update',
                    'message' => $update->message,
                    'project_title' => $update->project->title,
                    'user_name' => $update->user->name,
                    'created_at' => $update->created_at,
                ];
            });

        return Inertia::render('client/dashboard', [
            'activeProjectsCount' => $activeProjectsCount,
            'unreadMessagesCount' => $unreadMessagesCount,
            'upcomingMilestones' => $upcomingMilestones,
            'recentActivity' => $recentUpdates,
        ]);
    }
}
