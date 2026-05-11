<?php

namespace App\Http\Controllers;

use App\Enums\UserRoles;
use App\Enums\UserStatus;
use App\Mail\MagicLinkEmail;
use App\Models\Client;
use App\Models\MagicToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('freelancer/clients/index', [
            'clients' => Client::where('user_id', Auth::id())
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('freelancer/clients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email|unique:users,email',
            'phone' => 'nullable|string|max:50',
            'whatsapp_number' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'website_url' => 'nullable|url|max:255',
            'timezone' => 'nullable|string|max:100',
            'status' => 'required|string|in:active,inactive,lead,suspended,pending',
            'notes' => 'nullable|string',
            'preferences' => 'nullable|array',
        ]);

        DB::transaction(function () use ($validated) {

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['name'].'123',
                'role' => UserRoles::CLIENT,
                'status' => UserStatus::ACTIVE,
            ]);

            \App\Http\Controllers\Auth\EmailVerificationOTPController::sendOTP($user);

            $client = Client::create(array_merge($validated, [
                'user_id' => Auth::id(),
                'account_id' => $user->id,
            ]));

            $token = Str::random(64);

            MagicToken::create([
                'user_id' => $user->id,
                'client_id' => $client->id,
                'token' => $token,
                'expires_at' => now()->addHours(24),
                'created_at' => now(),
            ]);

            try {
                Mail::to($user->email)->send(new MagicLinkEmail($token, $user->name));
            } catch (\Exception $e) {
                Log::error('Failed to send magic link: '.$e->getMessage());
            }
        });

        return redirect()->route('freelancer.clients')->with('success', 'Client added and account provisioned successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client): Response
    {
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('freelancer/clients/edit', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,'.$client->id,
            'phone' => 'nullable|string|max:50',
            'whatsapp_number' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'website_url' => 'nullable|url|max:255',
            'timezone' => 'nullable|string|max:100',
            'status' => 'required|string|in:active,inactive,lead,suspended,pending',
            'notes' => 'nullable|string',
            'preferences' => 'nullable|array',
        ]);

        $client->update($validated);

        return redirect()->route('freelancer.clients')->with('success', 'Client updated successfully.');
    }

    public function show(Client $client)
    {
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('freelancer/clients/show', [
            'client' => $client,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        $client->delete();

        return back()->with('success', 'Client deleted successfully.');
    }

    /**
     * Send a magic link to the client.
     */
    public function sendMagicLink(Client $client)
    {
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        $token = Str::random(64);

        MagicToken::create([
            'user_id' => $client->account_id,
            'client_id' => $client->id,
            'token' => $token,
            'expires_at' => now()->addHours(24),
            'created_at' => now(),
        ]);

        try {
            Mail::to($client->email)->send(new MagicLinkEmail($token, $client->name));
            return back()->with('success', 'Magic link sent successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to send magic link: '.$e->getMessage());
            return back()->with('error', 'Failed to send magic link.');
        }
    }
}
