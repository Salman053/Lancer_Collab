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

    // Allow access if the user is the owner of the project or if the user is the client associated with the project
    return $user->id === $project->user_id ||
           ($project->client && $project->client->account_id === $user->id);
});
