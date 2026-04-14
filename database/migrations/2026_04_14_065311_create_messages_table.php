<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('from_user_id')->constrained('users')->onDelete('restrict');
            $table->foreignId('to_user_id')->constrained('users')->onDelete('restrict');

            $table->string('to_email')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');

            $table->boolean('is_reply')->default(false);
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('created_at')->nullable();

            $table->index(['project_id', 'created_at'], 'idx_project_created');
            $table->index('to_email', 'idx_to_email');
            $table->index('sent_at', 'idx_sent_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
