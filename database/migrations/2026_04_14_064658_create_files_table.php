<?php

use App\Enums\FileType;
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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');

            $table->string('file_name');
            $table->string('file_path', 500);
            $table->enum('file_type', FileType::values())->default(FileType::GENERAL->value);
            $table->unsignedBigInteger('file_size');
            $table->string('mime_type', 100)->nullable();
            $table->boolean('client_can_see')->default(true);
            $table->boolean('client_can_download')->default(true);
            $table->unsignedInteger('download_count')->default(0);
            $table->timestamps();

            $table->index(['project_id', 'file_type'], 'idx_project_type');
            $table->index('created_at', 'idx_created_at');
            $table->index(['project_id', 'client_can_download'], 'idx_client_access');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
