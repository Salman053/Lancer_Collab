<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
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
            'clients' => Client::where('user_id', auth()->id())
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
            'email' => 'required|email|unique:clients,email',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'timezone' => 'nullable|string|max:100',
            'status' => 'required|string|in:active,inactive,lead,suspended,pending',
            'preferences' => 'nullable|array',
        ]);

        $validated['user_id'] = auth()->id();

        Client::create($validated);

        return back()->with('success', 'Client created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        if ($client->user_id !== auth()->id()) {
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
        if ($client->user_id !== auth()->id()) {
            abort(403);
        }

        $client->delete();

        return back()->with('success', 'Client deleted successfully.');
    }
}
