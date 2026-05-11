<?php

namespace App\Models;

use App\Enums\UserRoles;
use App\Enums\UserStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements \Illuminate\Contracts\Auth\MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'phone',
        'otp',
        'otp_expires_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    public function client(): HasOne
    {
        return $this->hasOne(Client::class, 'account_id');
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function activeClients()
    {
        return $this->clients()->where('status', 'active');
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'from_user_id');
    }

    public function receivedMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'to_user_id');
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRoles::class,
            'status' => UserStatus::class,
            'otp_expires_at' => 'datetime',
        ];
    }
}
