<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Client;
use App\Enums\UserRoles;
use App\Enums\UserStatus;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientLoginTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
    }

    public function test_client_provisioned_password_works()
    {
        $name = 'John Doe';
        $email = 'john@example.com';
        
        // New logic: exactly [name]123
        $generatedPassword = $name.'123'; // "John Doe123"
        
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $generatedPassword,
            'role' => UserRoles::CLIENT,
            'status' => UserStatus::ACTIVE,
        ]);

        $response = $this->post('/login', [
            'email' => $email,
            'password' => $generatedPassword,
        ]);

        $response->assertRedirect('/client/dashboard');
        $this->assertAuthenticatedAs($user);
    }

    public function test_client_login_fails_with_transformed_name()
    {
        $name = 'John Doe';
        $email = 'john@example.com';
        
        $generatedPassword = $name.'123'; // "John Doe123"
        
        User::create([
            'name' => $name,
            'email' => $email,
            'password' => $generatedPassword,
            'role' => UserRoles::CLIENT,
            'status' => UserStatus::ACTIVE,
        ]);

        // Trying to login with what the OLD logic would have produced: "johndoe123"
        $response = $this->post('/login', [
            'email' => $email,
            'password' => 'johndoe123',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }
}
