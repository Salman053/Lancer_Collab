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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string("fullname")->unique();
            $table->text("address");
            $table->text("notes")->nullable();
            $table->string("phone")->nullable();
            $table->string("email")->nullable();
            $table->string("status")->default("active");
            $table->string("company")->nullable();
            $table->string("website_url")->nullable();
            $table->string("profile_image_url")->nullable();
            $table->string("timezone")->default("UTC");
            $table->string("watsapp_number")->nullable();
            $table->timestamps();
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
