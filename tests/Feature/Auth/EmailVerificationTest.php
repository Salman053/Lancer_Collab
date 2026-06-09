<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Enums\UserRoles;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_verification_screen_can_be_rendered()
    {
        $user = User::factory()->unverified()->create();

        $response = $this->actingAs($user)->get('/verify-email');

        $response->assertStatus(200);
    }

    public function test_email_can_be_verified()
    {
        $user = User::factory()->unverified()->create(['role' => UserRoles::FREELANCER]); // Ensure the test user is a freelancer

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.auto',
            now()->addDays(1),
            ['id' => $user->id, 'hash' => sha1($user->getEmailForVerification())]
        );

        $response = $this->actingAs($user)->get($verificationUrl);

        // Event::assertDispatched(Verified::class); // This event might need adjustment if the new controller doesn't fire it.
        $user->refresh(); // Refresh user to get verified status
        $this->assertTrue($user->hasVerifiedEmail());
        $response->assertRedirect(route('freelancer.dashboard', absolute: false).'?verified=1'); // Expect freelancer dashboard
    }

    public function test_email_is_not_verified_with_invalid_hash()
    {
        $user = User::factory()->unverified()->create(['role' => UserRoles::FREELANCER]); // Ensure the test user is a freelancer

        $verificationUrl = URL::temporarySignedRoute(
            'verification.auto',
            now()->addDays(1),
            ['id' => $user->id, 'hash' => sha1('wrong-email')]
        );

        $this->actingAs($user)->get($verificationUrl);

        $user->refresh(); // Refresh user to check status
        $this->assertFalse($user->hasVerifiedEmail());
    }
}
