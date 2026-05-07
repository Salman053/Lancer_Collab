<?php

namespace App\Models;

use App\Enums\ProjectType;
use App\Enums\ProjectStatus;
use App\Enums\MilestoneStatus;
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
        'notes',
        'color',
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


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    }


    public function milestones()
    {
        return $this->hasMany(Milestone::class)->orderBy('order');
    }

    public function updates()
    {
        return $this->hasMany(ProjectUpdate::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function getProgressAttribute(): int
    {
        $total = $this->milestones()->count();

        if ($total === 0) {
            return $this->attributes['progress'] ?? 0;
        }

        $completed = $this->milestones()
            ->where('status', MilestoneStatus::COMPLETED)
            ->count();

        return (int) (($completed / $total) * 100);
    }
}
