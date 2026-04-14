<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectUpdate extends Model
{
    use HasFactory;

    /**
     * Disable updated_at as it wasn't in your SQL schema.
     */
    public $timestamps = false;

    protected $fillable = [
        'project_id',
        'user_id',
        'message',
        'attachment_path',
        'visible_to_client',
        'seen_by_client_at',
        'created_at',
    ];

    protected $casts = [
        'visible_to_client' => 'boolean',
        'seen_by_client_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
