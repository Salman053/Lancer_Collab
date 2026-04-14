<?php

use App\Enums\ClientStatus;
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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone', 50)->nullable();
            $table->string('whatsapp_number', 50)->nullable();
            $table->string('company')->nullable();

            $table->text('address')->nullable();
            $table->string('website_url')->nullable();
            $table->string('profile_image_url')->nullable();
            $table->string('timezone', 100)->default('UTC');
            $table->enum('status', ClientStatus::values())->default(ClientStatus::ACTIVE->value);
            $table->text('notes')->nullable();
            $table->json('preferences')->nullable();
            $table->timestamps();
            $table->index('name');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
