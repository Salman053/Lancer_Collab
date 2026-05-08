<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence;
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraph,
            'status' => 'open',
            'priority' => 'medium',
            'type' => 'Web',
            'progress' => 0,
            'currency' => 'USD',
            'actual_cost' => 0,
            'billing_type' => 'fixed',
            'color' => $this->faker->hexColor,
            'client_id' => null, // Will be set manually in tests to point to Client model ID if needed
            'user_id' => User::factory(),
        ];
    }
}
