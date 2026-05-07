<x-mail::message>
# Welcome to LaraCollab, {{ $name }}!

You've been invited to join your project portal. Click the button below to log in instantly. No password required.

<x-mail::button :url="$url">
Login to My Portal
</x-mail::button>

This link will expire in 24 hours.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
