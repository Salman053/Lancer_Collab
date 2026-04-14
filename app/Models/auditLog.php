<?php

namespace App\Models;

use App\Enums\AuditLogType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'to_email',
        'type',
        'reference_id',
        'status',
        'error_message',
        'opened_at',
        'created_at',
    ];

    protected $casts = [
        'type' => AuditLogType::class,
        'opened_at' => 'datetime',
        'created_at' => 'datetime',
    ];
}
