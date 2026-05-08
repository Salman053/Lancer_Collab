<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getNotifications()
    {
        $user = Auth::user();
        
        return response()->json([
            'notifications' => $user->notifications()->latest()->limit(20)->get(),
            'unread_count' => $user->unreadNotifications()->count(),
        ]);
    }

    public function markAsRead(Request $request)
    {
        $user = Auth::user();
        
        if ($request->has('id')) {
            $user->unreadNotifications()->where('id', $request->id)->update(['read_at' => now()]);
        } else {
            $user->unreadNotifications->markAsRead();
        }

        return redirect()->back();
    }

    public function index()
    {
        return inertia('notifications/index', [
            'notifications' => Auth::user()->notifications()->paginate(20),
        ]);
    }
}
