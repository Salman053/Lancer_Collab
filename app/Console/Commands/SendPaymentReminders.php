<?php

namespace App\Console\Commands;

use App\Models\Payment;
use App\Enums\PaymentStatus;
use App\Notifications\PaymentReminderNotification;
use Illuminate\Console\Command;

class SendPaymentReminders extends Command
{
    protected $signature = 'payments:remind';
    protected $description = 'Send reminders for overdue or upcoming payments';

    public function handle()
    {
        $overduePayments = Payment::where('status', PaymentStatus::PENDING)
            ->where('due_date', '<', now())
            ->with(['project.client.user'])
            ->get();

        foreach ($overduePayments as $payment) {
            $user = $payment->project->client->user;
            if ($user) {
                $user->notify(new PaymentReminderNotification($payment));
            }
        }

        $this->info('Payment reminders sent successfully.');
    }
}
