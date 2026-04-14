<?php

namespace App\Models;

use App\Enums\FileType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasFactory;

    /**
     * Disable updated_at since it's not in the schema.
     */
    public $timestamps = false;

    protected $fillable = [
        'project_id',
        'user_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'mime_type',
        'client_can_download',
        'download_count',
        'created_at',
    ];

    protected $casts = [
        'client_can_download' => 'boolean',
        'download_count' => 'integer',
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'file_type' => FileType::class,
    ];

    /**
     * Get the project associated with the file.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the user who uploaded the file.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
