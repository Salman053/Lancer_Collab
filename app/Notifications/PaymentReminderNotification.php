<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(protected Payment $payment)
    {
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Payment Reminder: ' . $this->payment->project->title)
            ->line('This is a friendly reminder that a payment is due for your project: ' . $this->payment->project->title)
            ->line('Amount: ' . $this->payment->amount)
            ->action('View Project', url('/client/projects/' . $this->payment->project_id))
            ->line('Thank you for your business!');
    }

    public function toArray($notifiable): array
    {
        return [
            'payment_id' => $this->payment->id,
            'project_title' => $this->payment->project->title,
            'amount' => $this->payment->amount,
            'message' => 'Payment due for ' . $this->payment->project->title,
        ];
    }
}
