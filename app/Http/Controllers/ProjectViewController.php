<?php

namespace App\Http\Controllers;

use App\Models\ProjectView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectViewController extends Controller
{
    public function index()
    {
        $views = ProjectView::whereHas('project', function($query) {
            $query->where('user_id', Auth::id());
        })
        ->with(['project', 'user'])
        ->latest()
        ->get();

        return Inertia::render('freelancer/engagement/index', [
            'views' => $views,
        ]);
    }
}
