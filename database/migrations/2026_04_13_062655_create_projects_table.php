<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("projects", function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("slug")->unique();
            $table->text("description");
            $table->string("client_email")->unique()->nullable();
            $table->string("address")->nullable();
            $table->string("status")->default('open');
            $table->string("priority")->default('medium');
            $table->string("type")->default('Web');
            $table->decimal("budget", 15, 2)->nullable();
            $table->decimal("actual_cost", 15, 2)->default(0);
            $table->date("start_date")->nullable();
            $table->date("deadline")->nullable();
            $table->timestamp("completed_at")->nullable();
            $table->foreignId("user_id")->constrained("users")->onDelete("cascade");
            $table->softDeletes();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("projects");
    }
};
