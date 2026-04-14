<?php

namespace App\Enums;

enum FileType: string
{
    case MILESTONE = 'milestone';
    case UPDATE = 'update';
    case INVOICE = 'invoice';
    case GENERAL = 'general';

    public function label(): string
    {
        return match ($this) {
            self::MILESTONE => 'Project Milestone',
            self::UPDATE => 'Status Update',
            self::INVOICE => 'Billing Invoice',
            self::GENERAL => 'General File',
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
