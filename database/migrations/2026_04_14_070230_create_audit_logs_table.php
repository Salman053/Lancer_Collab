<?php

use App\Enums\AuditLogType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('to_email');

            $table->enum('type', array_column(AuditLogType::cases(), 'value'));

            $table->unsignedBigInteger('reference_id');
            $table->enum('status', ['sent', 'failed', 'opened', 'bounced'])->default('sent');
            $table->text('error_message')->nullable();
            $table->timestamp('opened_at')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();

            $table->index('to_email');
            $table->index(['type', 'reference_id']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
