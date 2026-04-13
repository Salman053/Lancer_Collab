<?php

namespace App\Enums;

enum MilestoneStatus: string
{
    case PENDING = 'pending';
    case IN_PROGRESS = 'in_progress';
    case IN_REVIEW = 'in_review';
    case REVISION = 'revision';
    case COMPLETED = 'completed';
    case HOLD = 'hold';

    
    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Pending',
            self::IN_PROGRESS => 'In Progress',
            self::IN_REVIEW => 'In Review',
            self::REVISION => 'Revision Requested',
            self::COMPLETED => 'Completed',
            self::HOLD => 'On Hold',
        };
    }

    
    public function color(): string
    {
        return match ($this) {
            self::PENDING => 'gray',        
            self::IN_PROGRESS => 'blue',    
            self::IN_REVIEW => 'yellow',    
            self::REVISION => 'purple',     
            self::COMPLETED => 'green',     
            self::HOLD => 'red',            
        };
    }

    
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    
    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn ($case) => [
            $case->value => $case->label()
        ])->toArray();
    }
}
