<?php

namespace App\Models;

use App\Enums\ProjectType;
use App\ProjectStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{

    use SoftDeletes;
    protected $table = 'projects';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'status',
        'priority',
        'type',
        'budget',
        'actual_cost',
        'start_date',
        'deadline',
        'completed_at',
        'user_id',
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'actual_cost' => 'decimal:2',
        'start_date' => 'date',
        'deadline' => 'date',
        'completed_at' => 'datetime',
        'status' => ProjectStatus::class,
        'type' => ProjectType::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
