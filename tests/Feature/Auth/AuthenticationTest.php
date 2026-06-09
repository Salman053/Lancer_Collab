<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash; // Import Hash facade
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen()
    {
        // Create a user with a default role (e.g., FREELANCER) and ensure they are verified.
        $user = User::factory()->create([
            'role' => \App\Enums\UserRoles::FREELANCER,
            'email_verified_at' => now(), // Ensure user is verified for direct dashboard access
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($user); // Assert the correct user is authenticated
        // Assert redirection to the correct role-specific dashboard.
        $response->assertRedirect(route('freelancer.dashboard', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create(['password' => Hash::make('password')]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('email');
    }

    public function test_users_can_logout()
    {
        $user = User::factory()->create();
        $this->actingAs($user); // Ensure user is logged in

        $response = $this->post('/logout');

        $this->assertGuest(); // Assert user is no longer authenticated
        $response->assertRedirect('/');
    }
}
