<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProjectUpdateDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $updateId;

    public $projectId;

    public function __construct($updateId, $projectId)
    {
        $this->updateId = $updateId;
        $this->projectId = $projectId;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('project.'.$this->projectId),
        ];
    }

    public function broadcastAs(): string
    {
        return 'ProjectUpdateDeleted';
    }
}
