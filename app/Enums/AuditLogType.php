<?php

namespace App\Enums;

enum AuditLogType: string
{
    // Existing cases
    case PAYMENT_RECEIPT = 'payment_receipt';
    case UPDATE_NOTIFICATION = 'update_notification';
    case MILESTONE_REMINDER = 'milestone_reminder';
    case WELCOME = 'welcome';
    case PAYMENT_REMINDER = 'payment_reminder';

    // Project & Task Lifecycle
    case PROJECT_CREATED = 'project_created';
    case PROJECT_COMPLETED = 'project_completed';
    case MILESTONE_CREATED = 'milestone_created';
    case MILESTONE_APPROVED = 'milestone_approved';
    case TASK_ASSIGNED = 'task_assigned';

    // Document & File Actions
    case FILE_UPLOADED = 'file_uploaded';
    case INVOICE_GENERATED = 'invoice_generated';
    case CONTRACT_SIGNED = 'contract_signed';

    // User & Security
    case USER_LOGIN = 'user_login';
    case PROFILE_UPDATED = 'profile_updated';
    case SETTINGS_CHANGED = 'settings_changed';

    public function label(): string
    {
        return match ($this) {
            self::PAYMENT_RECEIPT => 'Payment Receipt Sent',
            self::UPDATE_NOTIFICATION => 'Update Notification Sent',
            self::MILESTONE_REMINDER => 'Milestone Reminder Sent',
            self::WELCOME => 'Welcome Email Sent',
            self::PAYMENT_REMINDER => 'Payment Reminder Sent',
            self::PROJECT_CREATED => 'Project Created',
            self::PROJECT_COMPLETED => 'Project Marked Completed',
            self::MILESTONE_CREATED => 'New Milestone Added',
            self::MILESTONE_APPROVED => 'Milestone Approved',
            self::TASK_ASSIGNED => 'Task Assigned to User',
            self::FILE_UPLOADED => 'New Document Uploaded',
            self::INVOICE_GENERATED => 'Invoice Generated',
            self::CONTRACT_SIGNED => 'Contract Signed',
            self::USER_LOGIN => 'User Logged In',
            self::PROFILE_UPDATED => 'Profile Details Updated',
            self::SETTINGS_CHANGED => 'System Settings Changed',
        };
    }

    /**
     * Returns an array of all raw string values.
     * Useful for migrations: $table->enum('type', AuditLogType::values());
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn ($case) => [
            $case->value => $case->label(),
        ])->toArray();
    }
}
