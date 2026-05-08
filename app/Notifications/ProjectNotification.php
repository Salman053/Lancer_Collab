<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectNotification extends Notification
{
    use Queueable;

    protected $data;

    /**
     * Create a new notification instance.
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => $this->data['title'] ?? 'Project Update',
            'message' => $this->data['message'] ?? '',
            'url' => $this->data['url'] ?? '#',
            'type' => $this->data['type'] ?? 'info', // info, success, warning, error
            'project_id' => $this->data['project_id'] ?? null,
            'icon' => $this->data['icon'] ?? 'Bell',
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'title' => $this->data['title'] ?? 'Project Update',
            'message' => $this->data['message'] ?? '',
            'url' => $this->data['url'] ?? '#',
            'type' => $this->data['type'] ?? 'info',
            'project_id' => $this->data['project_id'] ?? null,
            'icon' => $this->data['icon'] ?? 'Bell',
        ]);
    }
}
