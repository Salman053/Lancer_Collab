<?php

namespace App\Enums;

enum UserStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case BLOCKED = 'blocked';
    case ARCHIVED = 'archived';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active Account',
            self::INACTIVE => 'Inactive',
            self::BLOCKED => 'Blocked/Suspended',
            self::ARCHIVED => 'Archived',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::ACTIVE => 'success',
            self::INACTIVE => 'secondary',
            self::BLOCKED => 'danger',
            self::ARCHIVED => 'warning',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn ($case) => [
            $case->value => $case->label(),
        ])->toArray();
    }
}
