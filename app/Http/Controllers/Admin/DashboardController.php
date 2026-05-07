<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Project;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $activeProjects = Project::whereNotIn('status', ['completed', 'archived'])->count();
        $recentLogs = AuditLog::latest()->take(5)->get();

        return Inertia::render('admin/dashboard', [
            'totalUsers' => $totalUsers,
            'activeProjects' => $activeProjects,
            'recentLogs' => $recentLogs,
        ]);
    }
}
