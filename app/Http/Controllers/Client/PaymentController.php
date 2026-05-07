<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $clientId = Auth::user()->client->id;

        $payments = Payment::whereHas('project', function ($query) use ($clientId) {
            $query->where('client_id', $clientId);
        })
        ->with('project')
        ->latest()
        ->get();

        return Inertia::render('client/payments/index', [
            'payments' => $payments,
        ]);
    }
}
