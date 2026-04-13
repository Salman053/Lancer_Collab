<?php

namespace App\Enums;

enum UserRole: string {
    case ADMIN = 'admin';
    case GUEST = 'guest';
    case CLIENT = 'client';
    case FREELANCER = 'freelancer';

    
    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn ($case) => [
            $case->value => ucfirst($case->value)
        ])->toArray();
    }

    
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    
    public function label(): string
    {
        return match($this) {
            self::ADMIN      => 'System Administrator',
            self::GUEST      => 'Guest User',
            self::CLIENT     => 'Project Client',
            self::FREELANCER => 'External Freelancer',
        };
    }

    
    public function color(): string
    {
        return match($this) {
            self::ADMIN      => 'danger',  
            self::CLIENT     => 'primary', 
            self::FREELANCER => 'info',    
            self::GUEST      => 'secondary', 
        };
    }
}
