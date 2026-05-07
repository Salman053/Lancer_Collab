<?php

use App\Enums\UserRoles;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Auth;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,

        ]);
        $middleware->alias([
            'role' => RoleMiddleware::class,
        ]);

        $middleware->redirectUsersTo(function () {
            $user = Auth::user();
            if (!$user) {
                return route('home');
            }

            return match ($user->role) {
                UserRoles::ADMIN => route('dashboard'),
                UserRoles::FREELANCER => route('freelancer.dashboard'),
                UserRoles::CLIENT => route('client.dashboard'),
                default => route('home'),
            };
        });

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
