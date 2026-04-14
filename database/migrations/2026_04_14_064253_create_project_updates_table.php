<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');

            $table->text('message');

            if (DB::getDriverName() !== 'sqlite') {
                $table->fullText('message');
            }
            $table->string('attachment_path', 500)->nullable();

            $table->boolean('visible_to_client')->default(true);
            $table->timestamp('seen_by_client_at')->nullable();

            $table->timestamps();

            $table->index(['project_id', 'visible_to_client'], 'idx_project_visible');
            $table->index(['project_id', 'seen_by_client_at'], 'idx_seen_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_updates');
    }
};
