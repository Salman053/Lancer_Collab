<?php
use App\Enums\PaymentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId("project_id")->constrained("projects")->cascadeOnDelete();
            $table->foreignId("milestone_id")->nullable()->constrained("milestones")->nullOnDelete();

            $table->decimal("amount", 15, 2);
            $table->string("method");
            $table->string("status")->default(PaymentStatus::PENDING->value);

            $table->string("transaction_id")->nullable();
            $table->text("notes")->nullable();
            $table->string("receipt_path", 500)->nullable();

            $table->timestamp("paid_at")->nullable();
            $table->timestamps();

            
            $table->index(['project_id', 'status']);
            $table->index('transaction_id');
            $table->index('method');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
