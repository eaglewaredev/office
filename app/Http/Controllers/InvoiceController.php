<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceCollection;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    function index() {
        return Inertia::render(
            'invoice/index',[
                'invoices'=>new InvoiceCollection(Invoice::orderBy('id', 'desc')->get()),
            ]
        );
    }
}
