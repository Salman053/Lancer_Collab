<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    /**
     * Disable updated_at as it is missing from the SQL schema.
     */
    public $timestamps = false;

    protected $fillable = [
        'project_id',
        'from_user_id',
        'to_email',
        'subject',
        'message',
        'is_reply',
        'sent_at',
        'created_at',
    ];

    protected $casts = [
        'is_reply' => 'boolean',
        'sent_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    /**
     * Get the project the message belongs to.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the user who sent the message.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function reciever(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to_user_id');
    }
}
