<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRoles;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['sometimes', 'string', 'in:'.implode(',', UserRoles::values())],
        ]);

        $role = $request->has('role') && in_array($request->role, UserRoles::values())
            ? UserRoles::from($request->role)
            : UserRoles::FREELANCER;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $role,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        // Role-based redirection
        return $this->redirectBasedOnRole($user);
    }

    /**
     * Redirect users based on their role
     */
    protected function redirectBasedOnRole(User $user): RedirectResponse
    {
        return match ($user->role) {
            UserRoles::ADMIN => to_route('dashboard'),
            UserRoles::CLIENT => to_route('client.dashboard'),
            UserRoles::FREELANCER => to_route('freelancer.dashboard'),
            UserRoles::GUEST => to_route('guest.dashboard'),
            default => to_route('dashboard'),
        };
    }
}
