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
        Schema::create('rests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('study_session_id')->constrained()->onDelete('cascade');
            $table->timestamp('rest_start_time');
            $table->timestamp('rest_finish_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rests');
    }
};
