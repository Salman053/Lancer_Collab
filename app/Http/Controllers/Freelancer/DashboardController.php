<?php

namespace App\Http\Controllers\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Client;
use App\Models\Payment;
use App\Models\Task;
use App\Enums\ProjectStatus;
use App\Enums\PaymentStatus;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $activeProjects = Project::where('user_id', $user->id)
            ->where('status', ProjectStatus::IN_PROGRESS)
            ->count();
            
        $totalClients = Client::where('user_id', $user->id)->count();
        
        $totalRevenue = Payment::whereHas('project', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->where('status', PaymentStatus::COMPLETED)
        ->sum('amount');
        
        $pendingTasks = Task::where('user_id', $user->id)
            ->where('completed_at', null)
            ->count();
            
        $recentProjects = Project::where('user_id', $user->id)
            ->with('client')
            ->latest()
            ->limit(5)
            ->get();
            
        $upcomingTasks = Task::where('user_id', $user->id)
            ->where('completed_at', null)
            ->with('project')
            ->orderBy('due_date')
            ->limit(5)
            ->get();

        return Inertia::render('freelancer/dashboard', [
            'stats' => [
                'active_projects' => $activeProjects,
                'total_clients' => $totalClients,
                'total_revenue' => $totalRevenue,
                'pending_tasks' => $pendingTasks,
            ],
            'recent_projects' => $recentProjects,
            'upcoming_tasks' => $upcomingTasks,
        ]);
    }
}
