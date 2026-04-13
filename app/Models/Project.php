<?php

namespace App\Models;

use App\Enums\ProjectType;
use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'client_name',
        'client_email',
        'address',
        'status',
        'priority',
        'type',
        'progress',
        'budget',
        'currency',
        'actual_cost',
        'billing_type',
        'start_date',
        'deadline',
        'completed_at',
        'thumbnail',
        'user_id',
        'client_id',
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'actual_cost' => 'decimal:2',
        'progress' => 'integer',
        'start_date' => 'date',
        'deadline' => 'date',
        'completed_at' => 'datetime',
        'status' => ProjectStatus::class,
        'type' => ProjectType::class,
    ];

    /**
     * The User who owns/manages the project.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The registered Client associated with the project.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }
    public function project():BelongsTo{
        return $this->belongsTo(Project::class);
    }

    public function milestones()
    {
        return $this->hasMany(Milestone::class)->orderBy('order');
    }

}
