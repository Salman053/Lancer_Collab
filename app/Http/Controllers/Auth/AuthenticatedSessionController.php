<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRoles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();
        
        $defaultRoute = match ($user->role) {
            UserRoles::ADMIN => route('dashboard'),
            UserRoles::FREELANCER => route('freelancer.dashboard'),
            UserRoles::CLIENT => route('client.dashboard'),
            default => route('home'),
        };

        return redirect()->intended($defaultRoute);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function redirectBasedOnRole(): RedirectResponse
    {
        $user = Auth::user();
        if (! $user) {
            return redirect()->route('login');
        }

        return match ($user->role) {
            UserRoles::ADMIN => redirect()->route('dashboard'),
            UserRoles::FREELANCER => redirect()->route('freelancer.dashboard'),
            UserRoles::CLIENT => redirect()->route('client.dashboard'),
            default => redirect()->route('home'),
        };
    }
}
