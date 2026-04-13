<?php

namespace App\Models;

use App\Enums\MilestoneStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Milestone extends Model
{
   protected $table = "milestones";

   protected $fillable = [
      'project_id',
      'user_id',
      'title',
      'description',
      'amount',
      'due_date',
      'status',
      'order',
      'completed_at',
   ];

   protected $casts = [
      'status' => MilestoneStatus::class,
      'due_date' => 'date',
      'amount' => 'decimal:2',
      'completed_at' => 'datetime',
      'order' => 'integer',
   ];


   protected static function boot()
   {
      parent::boot();
      static::creating(function ($milestone) {
         if (!$milestone->order) {

            $milestone->order = static::where('project_id', $milestone->project_id)->max('order') + 1;
         }
      });
   }
   /**
    * Relationship: The project this milestone belongs to.
    */
   public function project(): BelongsTo
   {
      return $this->belongsTo(Project::class);
   }

   /**
    * Relationship: The user (freelancer/staff) assigned to this milestone.
    */
   public function user(): BelongsTo
   {
      return $this->belongsTo(User::class);
   }



   public function getProgressAttribute(): int
   {
      $total = $this->milestones()->count();

      if ($total === 0) {
         return 0;
      }

      $completed = $this->milestones()
         ->where('status', MilestoneStatus::COMPLETED)
         ->count();

      return (int) (($completed / $total) * 100);
   }
}
