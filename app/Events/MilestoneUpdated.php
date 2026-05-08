<?php

namespace App\Events;

use App\Models\Milestone;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MilestoneUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $milestone;

    public function __construct(Milestone $milestone)
    {
        $this->milestone = $milestone;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('project.' . $this->milestone->project_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'MilestoneUpdated';
    }
}
