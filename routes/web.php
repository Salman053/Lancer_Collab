<?php

use App\Enums\UserRoles;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'role:'.UserRoles::ADMIN->value])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});
Route::middleware(['auth', 'role:'.UserRoles::CLIENT->value])->prefix('client')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('client/dashboard');
    })->name('client.dashboard');
});
Route::middleware(['auth', 'role:'.UserRoles::FREELANCER->value])->prefix('freelancer')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('freelancer/dashboard');
    })->name('freelancer.dashboard');
    Route::get('clients', [ClientController::class, 'index'])->name('freelancer.clients');
    Route::post('clients', [ClientController::class, 'store'])->name('freelancer.clients.store');
    Route::put('clients/{client}', [ClientController::class, 'update'])->name('freelancer.clients.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
