<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StaffController;
use App\Http\Middleware\StaffMiddleware;
use Illuminate\Support\Facades\Route;

Route::domain(config('app.domain'))->group(function () {

    // login
    Route::get('login', [LoginController::class, 'login'])->name('login');
    Route::post('login', [LoginController::class, 'checkLogin']);
    Route::put('check', [LoginController::class, 'resendCode']);
    Route::get('logout', [LoginController::class, 'logout'])->name('logout');

    // forgot password
    Route::get('check-account', [LoginController::class, 'checkAccount']);
    Route::post('check-account', [LoginController::class, 'accountCheck']);


    Route::get('verify', [LoginController::class, 'verify'])->name('verify');
    Route::post('verify', [LoginController::class, 'checkVerification']);

    Route::get('change-password', [LoginController::class, 'changePassword'])->name('changePassword');
    Route::post('change-password', [LoginController::class, 'passwordChange']);

    Route::middleware(StaffMiddleware::class)->group(function () {
        Route::get('', [DashboardController::class, 'index'])->name('dashboard');

        Route::name('staff.')->group(function () {
            Route::prefix('staff')->group(function () {
                Route::get('', [StaffController::class, 'index'])->name('list');
                Route::prefix('new')->group(function() {
                    Route::get('', [StaffController::class, 'newStaff'])->name('new');
                    Route::post('', [StaffController::class, 'createStaff']);

                    Route::put('/email', [StaffController::class, 'sendEmailCode']);
                    Route::put('/email-validate', [StaffController::class, 'validateEmailCode']);

                    Route::put('/phone', [StaffController::class, 'sendPhoneCode']);
                    Route::put('/phone-validate', [StaffController::class, 'validatePhoneCode']);
                });
                Route::get('show/{ref}', [StaffController::class, 'show'])->name('show')->where('ref', '[a-z0-9]+');
            });
        });
    });
});
