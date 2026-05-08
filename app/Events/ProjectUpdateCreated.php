<?php

namespace App\Events;

use App\Models\ProjectUpdate;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProjectUpdateCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $update;

    public function __construct(ProjectUpdate $update)
    {
        $this->update = $update->load('user');
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('project.' . $this->update->project_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'ProjectUpdateCreated';
    }
}
