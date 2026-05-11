<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\VerifyEmailOTP;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use App\Enums\UserRoles;
class EmailVerificationOTPController extends Controller
{
    public function show(Request $request)
    {
        return $request->user()->hasVerifiedEmail()
            ? $this->redirectBasedOnRole($request->user())
            : Inertia::render('auth/verify-email', ['status' => session('status')]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        $user = $request->user();

        if ($user->otp !== $request->otp || $user->otp_expires_at->isPast()) {
            return back()->withErrors(['otp' => 'The OTP is invalid or has expired.']);
        }

        $user->markEmailAsVerified();
        $user->otp = null;
        $user->otp_expires_at = null;
        $user->save();

        return $this->redirectBasedOnRole($user, true);
    }

    public function autoVerify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403);
        }

        if ($user->hasVerifiedEmail()) {
            Auth::login($user);
            return $this->redirectBasedOnRole($user, true);
        }

        $user->markEmailAsVerified();
        $user->otp = null;
        $user->otp_expires_at = null;
        $user->save();

        Auth::login($user);

        return $this->redirectBasedOnRole($user, true);
    }

    protected function redirectBasedOnRole(User $user, bool $verified = false)
    {
        $route = match ($user->role) {
            UserRoles::ADMIN => route('dashboard'),
            UserRoles::FREELANCER => route('freelancer.dashboard'),
            UserRoles::CLIENT => route('client.dashboard'),
            default => route('home'),
        };

        if ($verified) {
            $route .= (str_contains($route, '?') ? '&' : '?') . 'verified=1';
        }

        return redirect()->intended($route);
    }

    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $this->redirectBasedOnRole($request->user());
        }
        $this->sendOTP($request->user());

        return back()->with('status', 'verification-link-sent');
    }

    public static function sendOTP(User $user)
    {
        $otp = sprintf("%06d", mt_rand(1, 999999));
        $user->otp = $otp;
        $user->otp_expires_at = Carbon::now()->addMinutes(15);
        $user->save();

        $link = URL::temporarySignedRoute(
            'verification.auto',
            Carbon::now()->addDays(1),
            ['id' => $user->id, 'hash' => sha1($user->getEmailForVerification())]
        );

        Mail::to($user->email)->send(new VerifyEmailOTP($otp, $user->name, $link));
    }
}
