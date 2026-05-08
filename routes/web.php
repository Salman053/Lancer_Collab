<?php

use App\Enums\UserRoles;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\Client\FreelancerController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ClientProjectController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MilestoneController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ProjectUpdateController;
use App\Http\Controllers\ProjectViewController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/executive-demo', function () {
    return Inertia::render('executive-demo');
})->name('executive-demo');

Route::middleware(['auth', 'role:'.UserRoles::ADMIN->value])->prefix('admin')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);

    Route::get('audit-logs', [AuditLogController::class, 'index'])->name('admin.audit-logs');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/api/notifications', [NotificationController::class, 'getNotifications'])->name('notifications.get');
    Route::post('/notifications/mark-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-read');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');

    Route::middleware('throttle:10,1')->group(function () {
        Route::get('files/{file}/download', [FileController::class, 'download'])->name('files.download');

        Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
        Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
        Route::delete('/messages/{message}/attachment', [MessageController::class, 'deleteAttachment'])->name('messages.attachment.destroy');
    });
});

Route::middleware(['auth', 'role:'.UserRoles::CLIENT->value])->prefix('client')->group(function () {
    Route::get('dashboard', [ClientDashboardController::class, 'index'])->name('client.dashboard');

    Route::get('projects', [ClientProjectController::class, 'index'])->name('client.projects');
    Route::get('projects/{project}', [ClientProjectController::class, 'show'])->name('client.projects.show');
    Route::get('freelancers', [FreelancerController::class, 'index'])->name('client.freelancers');
    Route::get('payments', [App\Http\Controllers\Client\PaymentController::class, 'index'])->name('client.payments');
    Route::post('tasks', [App\Http\Controllers\Client\TaskController::class, 'store'])->name('client.tasks.store');

    Route::put('milestones/{milestone}', [MilestoneController::class, 'clientUpdate'])->name('client.milestones.update');
    Route::get('projects/{project}/invoice', [InvoiceController::class, 'generate'])->name('projects.invoice');

    Route::get('messages', [MessageController::class, 'index'])->name('client.messages');
});
Route::middleware(['auth', 'role:'.UserRoles::FREELANCER->value])->prefix('freelancer')->group(function () {
    Route::get('dashboard', [App\Http\Controllers\Freelancer\DashboardController::class, 'index'])->name('freelancer.dashboard');

    Route::get('engagement', [ProjectViewController::class, 'index'])->name('freelancer.engagement');

    Route::get('tasks', [TaskController::class, 'index'])->name('freelancer.tasks');
    Route::post('tasks', [TaskController::class, 'store'])->name('freelancer.tasks.store');
    Route::put('tasks/{task}', [TaskController::class, 'update'])->name('freelancer.tasks.update');
    Route::put('tasks/{task}/toggle', [TaskController::class, 'toggleComplete'])->name('freelancer.tasks.toggle');
    Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->name('freelancer.tasks.destroy');

    // Schedule
    Route::get('schedule', [ScheduleController::class, 'index'])->name('freelancer.schedule');

    // Clients Routes
    Route::get('clients', [ClientController::class, 'index'])->name('freelancer.clients');
    Route::get('clients/create', [ClientController::class, 'create'])->name('freelancer.clients.create');
    Route::get('clients/{client}/edit', [ClientController::class, 'edit'])->name('freelancer.clients.edit');
    Route::get('clients/{client}', [ClientController::class, 'show'])->name('freelancer.clients.show');
    Route::post('clients', [ClientController::class, 'store'])->name('freelancer.clients.store');
    Route::put('clients/{client}', [ClientController::class, 'update'])->name('freelancer.clients.update');
    Route::delete('clients/{client}', [ClientController::class, 'destroy'])->name('freelancer.clients.destroy');
    Route::post('clients/{client}/magic-link', [ClientController::class, 'sendMagicLink'])->name('freelancer.clients.magic-link');
    Route::get('projects/{project}/invoice', [InvoiceController::class, 'generate'])->name('projects.invoice');

    // Projects Routes
    Route::get('projects', [ProjectsController::class, 'index'])->name('freelancer.projects');
    Route::get('projects/create', [ProjectsController::class, 'create'])->name('freelancer.projects.create');
    Route::get('projects/{project}/edit', [ProjectsController::class, 'edit'])->name('freelancer.projects.edit');
    Route::get('projects/{project}', [ProjectsController::class, 'show'])->name('freelancer.projects.show');
    Route::post('projects', [ProjectsController::class, 'store'])->name('freelancer.projects.store');
    Route::put('projects/{project}', [ProjectsController::class, 'update'])->name('freelancer.projects.update');
    Route::delete('projects/{project}', [ProjectsController::class, 'destroy'])->name('freelancer.projects.destroy');

    // Payment Routes
    Route::get('payments', [PaymentController::class, 'index'])->name('freelancer.payments');
    Route::post('payments', [PaymentController::class, 'store'])->name('freelancer.payments.store');
    Route::put('payments/{payment}', [PaymentController::class, 'update'])->name('freelancer.payments.update');
    Route::delete('payments/{payment}', [PaymentController::class, 'destroy'])->name('freelancer.payments.destroy');

    // Milestone Routes
    Route::post('milestones', [MilestoneController::class, 'store'])->name('freelancer.milestones.store');
    Route::put('milestones/{milestone}', [MilestoneController::class, 'update'])->name('freelancer.milestones.update');
    Route::delete('milestones/{milestone}', [MilestoneController::class, 'destroy'])->name('freelancer.milestones.destroy');

    // Project Updates Routes
    Route::post('project-updates', [ProjectUpdateController::class, 'store'])->name('freelancer.project-updates.store');
    Route::delete('project-updates/{update}', [ProjectUpdateController::class, 'destroy'])->name('freelancer.project-updates.destroy');

    // Messages Routes
    Route::get('messages', [MessageController::class, 'index'])->name('freelancer.messages');

    // File Routes
    Route::post('files', [FileController::class, 'store'])->name('freelancer.files.store');
    Route::delete('files/{file}', [FileController::class, 'destroy'])->name('freelancer.files.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
