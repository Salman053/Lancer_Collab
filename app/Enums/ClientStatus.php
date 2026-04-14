<?php

namespace App\Enums;

enum ClientStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case LEAD = 'lead';
    case SUSPENDED = 'suspended';
    case PENDING = 'pending';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active Client',
            self::INACTIVE => 'Past Client',
            self::LEAD => 'Potential Lead',
            self::SUSPENDED => 'Account Suspended',
            self::PENDING => 'Awaiting Verification',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::ACTIVE => 'success',
            self::LEAD => 'info',
            self::PENDING => 'warning',
            self::SUSPENDED, self::INACTIVE => 'danger',
        };
    }

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
