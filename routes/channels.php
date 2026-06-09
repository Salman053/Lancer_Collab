<?php

use App\Models\Project;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('project.{projectId}', function ($user, $projectId) {
    $project = Project::find($projectId);
    if (!$project) {
        return false;
    }

    return $user->id === $project->user_id ||
           ($project->client && $project->client->account_id === $user->id);
});

Broadcast::channel('project-presence.{projectId}', function ($user, $projectId) {
    $project = Project::find($projectId);
    if (!$project) {
        return false;
    }

    if ($user->id == $project->user_id || ($project->client && $project->client->account_id == $user->id)) {
        return ['id' => $user->id, 'name' => $user->name];
    }

    return false;
});
