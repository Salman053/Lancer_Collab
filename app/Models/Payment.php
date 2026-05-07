<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use App\Enums\PaymentMethods;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'project_id', 
        'milestone_id', 
        'amount', 
        'method', 
        'status', 
        'transaction_id', 
        'notes', 
        'receipt_path', 
        'paid_at'
    ];

    protected $casts = [
        'status' => PaymentStatus::class,
        'method' => PaymentMethods::class,
        'paid_at' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function milestone(): BelongsTo
    {
        return $this->belongsTo(Milestone::class);
    }

    public function isCompleted(): bool
    {
        return $this->status === PaymentStatus::COMPLETED;
    }
}
