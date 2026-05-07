<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FreelancerController extends Controller
{
    public function index()
    {
        $clientId = Auth::user()->client->id;

        $freelancers = User::whereHas('projects', function ($query) use ($clientId) {
            $query->where('client_id', $clientId);
        })->distinct()->get();

        return Inertia::render('client/freelancers/index', [
            'freelancers' => $freelancers,
        ]);
    }
}
