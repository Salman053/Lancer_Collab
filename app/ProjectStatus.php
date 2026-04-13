<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case BACKLOG = 'backlog';
    case OPEN = 'open';
    case IN_PROGRESS = 'in_progress';
    case ON_REVIEW = 'on_review';
    case TESTING = 'testing';
    case COMPLETED = 'completed';
    case ON_HOLD = 'on_hold';
    case CANCELLED = 'cancelled';
    case ARCHIVED = 'archived';

    
    public function label(): string
    {
        return match ($this) {
            self::BACKLOG => 'Backlog',
            self::OPEN => 'Open',
            self::IN_PROGRESS => 'In Progress',
            self::ON_REVIEW => 'On Review',
            self::TESTING => 'Testing',
            self::COMPLETED => 'Completed',
            self::ON_HOLD => 'On Hold',
            self::CANCELLED => 'Cancelled',
            self::ARCHIVED => 'Archived',
        };
    }

    
    public function color(): string
    {
        return match ($this) {
            self::BACKLOG => 'secondary',
            self::OPEN => 'primary',
            self::IN_PROGRESS => 'info',
            self::ON_REVIEW => 'warning',
            self::TESTING => 'dark',
            self::COMPLETED => 'success',
            self::ON_HOLD => 'muted',
            self::CANCELLED, self::ARCHIVED => 'danger',
        };
    }

    
    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn ($case) => [
            $case->value => $case->label()
        ])->toArray();
    }

    
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
