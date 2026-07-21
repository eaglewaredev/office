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
        if(Schema::hasTable('quotations'))return;
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('ref_no')->unique(true);
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->on('clients')->references('id')->onDelete('restrict');
            $table->unsignedBigInteger('staff_id');
            $table->foreign('staff_id')->on('staff')->references('id')->onDelete('restrict');
            $table->string('validity_date')->nullable(true);
            $table->string('currency')->default('KSH');
            $table->integer('total')->default(0);
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
