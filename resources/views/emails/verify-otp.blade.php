<x-mail::message>
# Hello {{ $name }},

Thank you for joining LancerCollab. To complete your registration and verify your email address, please use the following One-Time Password (OTP):

<x-mail::panel>
# {{ $otp }}
</x-mail::panel>

This code will expire in 15 minutes.

Alternatively, you can click the button below to verify your account automatically:

<x-mail::button :url="$link">
Verify Email Automatically
</x-mail::button>

If you did not create an account, no further action is required.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
