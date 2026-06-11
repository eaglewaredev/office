<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::domain(config('app.domain'))->group(function() {
    Route::get('', [HomeController::class, 'index'])->name('home');
});
