<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of messages.
     */
    public function index(Request $request)
    {
        $userId = Auth::id();

        // Get projects where the user is either the freelancer or the client
        $projects = Project::where('user_id', $userId)
            ->orWhereHas('client', function($q) use ($userId) {
                $q->where('account_id', $userId);
            })
            ->with(['client.account', 'user'])
            ->withCount(['messages as unread_count' => function($q) use ($userId) {
                $q->where('to_user_id', $userId)->whereNull('read_at');
            }])
            ->get()
            ->map(function($project) use ($userId) {
                $project->other_user = $project->user_id === $userId 
                    ? $project->client?->account 
                    : $project->user;
                return $project;
            })
            ->filter(fn($p) => $p->other_user !== null);

        $selectedProjectId = $request->query('project_id');
        $messages = [];
        $selectedProject = null;

        if ($selectedProjectId) {
            $selectedProject = $projects->firstWhere('id', $selectedProjectId);
            if ($selectedProject) {
                $messages = Message::where('project_id', $selectedProjectId)
                    ->with(['sender', 'reciever'])
                    ->oldest()
                    ->get();
                
                // Mark as read
                Message::where('project_id', $selectedProjectId)
                    ->where('to_user_id', $userId)
                    ->whereNull('read_at')
                    ->update(['read_at' => now()]);
            }
        }

        return Inertia::render('messages/index', [
            'projects' => $projects->values(),
            'messages' => $messages,
            'selectedProjectId' => (int) $selectedProjectId,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'message' => 'required|string',
            'to_user_id' => 'required|exists:users,id',
        ]);

        $project = Project::with('client')->findOrFail($validated['project_id']);
        $user = Auth::user();

        // Authorization: Ensure the user is either the freelancer or the client assigned to the project
        $isFreelancer = $project->user_id === $user->id;
        $isClient = $project->client && $project->client->account_id === $user->id;

        if (! $isFreelancer && ! $isClient) {
            abort(403, 'You are not authorized to send messages to this project.');
        }

        Message::create([
            'project_id' => $validated['project_id'],
            'from_user_id' => $user->id,
            'to_user_id' => $validated['to_user_id'],
            'message' => $validated['message'],
            'sent_at' => now(),
            'created_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Message sent.');
    }
}
