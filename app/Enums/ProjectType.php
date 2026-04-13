<?php

namespace App\Enums;

enum ProjectType: string 
{
    case WEB = 'Web';
    case MOBILE = 'Mobile';
    case DESKTOP = 'Desktop';
    case MARKETING = 'Marketing';
    case CONSTRUCTION = 'Construction';
    case OTHER = 'Other';

    
    public function label(): string
    {
        return match ($this) {
            self::WEB          => "Web Development",
            self::MARKETING    => "Marketing Campaign",
            self::MOBILE       => "Mobile App",
            self::DESKTOP      => "Desktop Software",
            self::CONSTRUCTION => "Construction Project",
            self::OTHER        => "Other",
        };
    }

    /** 
     * Helper to get all options for a select dropdown
     * Usage: ProjectType::options() 
     */
    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn ($case) => [
            $case->value => $case->label()
        ])->toArray();
    }

    /** 
     * Helper for validation rules
     * Usage: Rule::in(ProjectType::values()) 
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
