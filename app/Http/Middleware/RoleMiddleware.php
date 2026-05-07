<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $userRole = $user->role;
        
        // Handle both Enum and string values
        $roleValue = $userRole instanceof \UnitEnum ? $userRole->value : $userRole;

        if (! in_array($roleValue, $roles)) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
