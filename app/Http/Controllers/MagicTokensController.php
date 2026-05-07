<?php

namespace App\Http\Controllers;

use App\Models\MagicToken;
use Illuminate\Support\Facades\Auth;

class MagicTokensController extends Controller
{
    /**
     * Authenticate a user using a magic token.
     */
    public function authenticate(string $token)
    {
        $magicToken = MagicToken::where('token', $token)
            ->isValid()
            ->first();

        if (! $magicToken) {
            return redirect()->route('login')->with('error', 'The magic link is invalid or has expired.');
        }

        // Mark token as used
        $magicToken->update([
            'used_at' => now(),
        ]);

        // Login the user
        Auth::login($magicToken->user);

        // Redirect to dashboard
        return redirect()->intended(route('client.dashboard'));
    }
}
