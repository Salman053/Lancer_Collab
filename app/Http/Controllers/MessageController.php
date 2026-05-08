<?php

namespace App\Http\Controllers;

use App\Events\MessageDeleted;
use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Project;
use App\Models\User;
use App\Events\DashboardUpdated;
use App\Notifications\ProjectNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of messages.
     */
    public function index(Request $request)
    {
        $userId = Auth::id();

        $projects = Project::where('user_id', $userId)
            ->orWhereHas('client', function ($q) use ($userId) {
                $q->where('account_id', $userId);
            })
            ->with(['client.account', 'user'])
            ->withCount(['messages as unread_count' => function ($q) use ($userId) {
                $q->where('to_user_id', $userId)->whereNull('read_at');
            }])
            ->get()
            ->map(function ($project) use ($userId) {
                $project->other_user = $project->user_id === $userId
                    ? $project->client?->account
                    : $project->user;

                return $project;
            })
            ->filter(fn ($p) => $p->other_user !== null);

        $selectedProjectId = $request->query('project_id');
        $messages = [];
        $selectedProject = null;

        if ($selectedProjectId) {
            $selectedProject = $projects->firstWhere('id', $selectedProjectId);
            if ($selectedProject) {
                $messages = Message::where('project_id', $selectedProjectId)
                    ->with(['sender', 'receiver'])
                    ->oldest()
                    ->get();

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'message' => 'required|string',
            'to_user_id' => 'required|exists:users,id',
            'attachment' => 'nullable|file|max:512', // Max 512KB (0.5MB)
        ]);

        $project = Project::with('client')->findOrFail($validated['project_id']);
        $user = Auth::user();

        // Authorization: Ensure the user is either the freelancer or the client assigned to the project
        $isFreelancer = $project->user_id === $user->id;
        $isClient = $project->client && $project->client->account_id === $user->id;

        if (! $isFreelancer && ! $isClient) {
            abort(403, 'You are not authorized to send messages to this project.');
        }

        $attachmentPath = null;
        $attachmentName = null;

        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $attachmentPath = $file->store('attachments/messages', 'public');
            $attachmentName = $file->getClientOriginalName();
        }

        $message = Message::create([
            'project_id' => $validated['project_id'],
            'from_user_id' => $user->id,
            'to_user_id' => $validated['to_user_id'],
            'message' => $validated['message'],
            'attachment_path' => $attachmentPath,
            'attachment_name' => $attachmentName,
            'sent_at' => now(),
            'created_at' => now(),
        ]);

        event(new MessageSent($message));

        // Notify Receiver
        $receiver = User::find($validated['to_user_id']);
        if ($receiver) {
            $url = $receiver->role === \App\Enums\UserRoles::CLIENT ? route('client.messages', ['project_id' => $project->id]) : route('freelancer.messages', ['project_id' => $project->id]);

            $receiver->notify(new ProjectNotification([
                'title' => 'New Message',
                'message' => "{$user->name} sent you a message in project \"{$project->title}\".",
                'url' => $url,
                'project_id' => $project->id,
                'type' => 'info',
                'icon' => 'MessageSquare',
            ]));
        }

        if ($receiver) {
            broadcast(new DashboardUpdated($receiver->id, 'messages'))->toOthers();
        }

        return redirect()->back()->with('success', 'Message sent.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $user = Auth::user();

        // Only the sender can delete the message
        if ($message->from_user_id !== $user->id) {
            abort(403, 'You are not authorized to delete this message.');
        }

        // Cleanup attachment if exists
        if ($message->attachment_path) {
            Storage::disk('public')->delete($message->attachment_path);
        }

        $messageClone = clone $message; // Clone to keep data for event after delete
        $message->delete();

        event(new MessageDeleted($messageClone));

        return redirect()->back()->with('success', 'Message deleted.');
    }

    /**
     * Delete only the attachment from a message.
     */
    public function deleteAttachment(Message $message)
    {
        $user = Auth::user();

        if ($message->from_user_id !== $user->id) {
            abort(403, 'You are not authorized to modify this message.');
        }

        if ($message->attachment_path) {
            Storage::disk('public')->delete($message->attachment_path);

            $message->update([
                'attachment_path' => null,
                'attachment_name' => null,
            ]);

            event(new MessageSent($message)); // Re-fire sent event to update UI
        }

        return redirect()->back()->with('success', 'Attachment deleted.');
    }
}
