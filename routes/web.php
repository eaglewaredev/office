<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\QuotationController;
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

        Route::name('client.')->group(function() {
            Route::prefix('client')->group(function() {
                Route::get('', [ClientController::class, 'index'])->name('list');
                Route::post('', [ClientController::class, 'createClient']);

                Route::prefix('show')->group(function() {
                    Route::get('{ref}', [ClientController::class, 'show'])->name('show')->where('ref', '[0-9a-z-]+');
                    Route::post('{ref}', [ClientController::class, 'updateClient'])->where('ref', '[0-9a-z-]+');
                });
            });
        });

        Route::name('quotation.')->group(function(){
            Route::prefix('quotations')->group(function() {
                Route::get('', [QuotationController::class, 'index'])->name('list');
                Route::post('', [QuotationController::class, 'createQuotation'])->name('create');
                Route::get('show/{ref}', [QuotationController::class, 'showQuotation'])->name('show')->where('ref', '[0-9A-Z-]+');
                Route::get('show/{ref}/pdf', [QuotationController::class, 'pdfDownload'])->name('quotationDownload');
                Route::post('show/{ref}/update', [QuotationController::class, 'updateQuote'])->name('updateQuote');
                Route::post('show/{ref}/quotation-update', [QuotationController::class, 'updateQuotation'])->name('updateQuotation');
                Route::post('show/{ref}', [QuotationController::class, 'newQuote']);
                Route::post('show/{ref}/quote', [QuotationController::class, 'newQuote'])->name('newQuote');
                Route::post('show/{ref}/quote-delete', [QuotationController::class, 'deleteQuote'])->name('deleteQuote');
                Route::post('show/{ref}/quote-item', [QuotationController::class, 'newQuoteItem'])->name('newQuoteItem');
                Route::post('show/{ref}/quote-item/update', [QuotationController::class, 'updateQuoteItem'])->name('updateQuoteItem');
                Route::post('show/{ref}/quote-item/delete', [QuotationController::class, 'deleteQuoteItem'])->name('deleteQuoteItem');
            });
        });

        Route::name('invoice.')->group(function() {
            Route::prefix('invoices')->group(function(){
                Route::get('', [InvoiceController::class, 'index'])->name('index');
                
            });
        });
    });
});
