<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'account_id',
        'name',
        'email',
        'phone',
        'whatsapp_number',
        'company',
        'address',
        'website_url',
        'profile_image_url',
        'timezone',
        'status',
        'notes',
        'preferences',
        'last_login_at',
    ];

    protected $casts = [
        'preferences' => 'array',
        'last_login_at' => 'datetime',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(User::class, 'account_id');
    }

    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
