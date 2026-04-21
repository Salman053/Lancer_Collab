<?php

namespace App\Http\Controllers;

use App\Enums\UserRoles;
use App\Enums\UserStatus;
use App\Models\Client;
use App\Models\MagicToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email|unique:users,email',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'timezone' => 'nullable|string|max:100',
            'status' => 'required|string|in:active,inactive,lead,suspended,pending',
            'preferences' => 'nullable|array',
        ]);

        DB::transaction(function () use ($validated) {

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['name'].'123'),
                'role' => UserRoles::CLIENT,
                'status' => UserStatus::ACTIVE,
            ]);

            $client = Client::create(array_merge($validated, [
                'user_id' => Auth::id(),
                'account_id' => $user->id,
            ]));

            MagicToken::create([
                'user_id' => $user->id,
                'client_id' => $client->id,
                'token' => Str::random(64),
                'expires_at' => now()->addHours(24),
                'created_at' => now(),
            ]);
        });

        return back()->with('success', 'Client added and account provisioned successfully.');
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
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'timezone' => 'nullable|string|max:100',
            'status' => 'required|string|in:active,inactive,lead,suspended,pending',
            'preferences' => 'nullable|array',
        ]);

        $client->update($validated);

        return back()->with('success', 'Client updated successfully.');
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
}
