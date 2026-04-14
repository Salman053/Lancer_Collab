<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'address',
        'timezone',
        'preferences',
        'last_login_at',
    ];

    protected $casts = [
        'preferences' => 'array',
        'last_login_at' => 'datetime',
    ];
}
