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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');

            $table->string('client_name')->nullable();
            $table->string('client_email')->nullable();
            $table->string('address')->nullable();

            $table->string('status')->default('open');
            $table->string('priority')->default('medium');
            $table->string('type')->default('Web');

            $table->unsignedInteger('progress')->default(0);
            $table->text('notes')->nullable();

            $table->decimal('budget', 15, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->decimal('actual_cost', 15, 2)->default(0);
            $table->string('billing_type')->default('fixed');

            $table->date('start_date')->nullable();
            $table->date('deadline')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->string('thumbnail')->nullable();
            $table->string('attachment_path')->nullable();
            $table->foreignId("client_id")->nullable()->constrained("users")->onDelete("set null");
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained('categories');

            $table->softDeletes();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
