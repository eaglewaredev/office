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
            $table->string('ref_no')->unique(true);
            $table->string('company_name');
            $table->string('contact_person')->nullable(true);
            $table->string('phone1')->nullable(true);
            $table->string('phone2')->nullable(true);
            $table->string('email')->nullable(true);
            $table->string('pin')->nullable(true);
            $table->string('location')->nullable(true);
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
