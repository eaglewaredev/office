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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('ref_no');
            $table->string('name');
            $table->string('username')->unique(true);
            $table->string('email')->unique(true);
            $table->string('phone')->unique(true);
            $table->integer('status')->default(1);
            $table->integer('admin')->default(0);
            $table->string('password');
            $table->string('remember_token')->nullable(true);
            $table->dateTime('last_login')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
