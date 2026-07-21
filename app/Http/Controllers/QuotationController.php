<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Http\Resources\QuotationCollection;
use App\Http\Resources\QuotationResource;
use App\Models\Client;
use App\Models\Number;
use App\Models\Quotation;
use App\Models\Quote;
use App\Models\QuoteItem;
use App\PDF\QuotationPDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class QuotationController extends Controller
{
    function index(){
        return Inertia::render(
            'quotations/index', [
                'quotations'=>new QuotationCollection(Quotation::orderBy('id', 'desc')->get()),
                'clients'=>new ClientCollection(Client::orderBy('id', 'desc')->get())
            ]
        );
    }

    function createQuotation(Request $r) {
        $r->validate([
            'name'=>'required',
        ]);

        $number = Number::where('name', 'Quotation')->first();
        $number->num += 1;

        $quote = new Quotation();
        $quote->ref_no = $number->prefix .'-'.$number->num.'-'.now()->format('Y');
        $quote->client_id = $r->clientId;
        $quote->staff_id = Auth::guard('staff')->id();
        $quote->validity_date = $r->validityPeriod;
        $quote->currency = $r->currency;
        // $quote->vat = $r->vat;

        if($quote->save()){
            $number->save();
            Inertia::flash('success', 'Quotation created successfully');
            return to_route('quotation.show', ['ref'=>$quote->ref_no]);
        }
        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }

    function updateQuotation($ref, Request $r){
        $r->validate([
            'name'=>'required',
        ]);

        $quotation = Quotation::where('ref_no', $ref)->firstOrFail();
        $quotation->client_id = $r->clientId;
        $quotation->staff_id = Auth::guard('staff')->id();
        $quotation->validity_date = $r->validityPeriod;
        $quotation->currency = $r->currency;

        if($quotation->save()){
            return Inertia::flash('success', 'Quotation updated successfully')->back();
        }
        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }

    function showQuotation($ref){
        return Inertia::render(
            'quotations/show',[
                'quotation'=>new QuotationResource(Quotation::where('ref_no', $ref)->firstOrFail()),
                'clients'=>new ClientCollection(Client::orderBy('id', 'desc')->get())
            ]
        );
    }

    function newQuote($id, Request $r){
        $r->validate([
            'name'=>'required',
            'vat'=>'required'
        ]);

        $quotation = Quotation::where('ref_no', $id)->firstOrFail();

        $quote = new Quote();
        $quote->quotation_id = $quotation->id;
        $quote->name = $r->name;
        $quote->vat = $r->vat;
        $quote->staff_id = Auth::guard('staff')->id();

        if($quote->save()) {
            $quotation->save();
            return Inertia::flash('success', 'Quote Table created successfully')->back();
        }

        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }

    function newQuoteItem($ref, Request $r){
        $r->validate([
            'description'=>'required',
            'total'=>'required'
        ]);

        $quotation = Quotation::where('ref_no', $ref)->firstOrFail();

        $quote = Quote::where('id', $r->id)->firstOrFail();

        $quoteItem = new QuoteItem();
        $quoteItem->quote_id = $quote->id;
        $quoteItem->quantity = $r->qty;
        $quoteItem->description = $r->description;
        $quoteItem->unit_price = $r->unitPrice;
        $quoteItem->total = $r->total;

        $quote->total = $quoteItem->total;

        $quotation->total += $quote->total;

        if($quoteItem->save()) {
            $this->evaluateTotals($quotation, $quote);
            return Inertia::flash('success', 'Quote Item created successfully')->back();
        }

        throw ValidationException::withMessages(['description'=>'Something went wrong']);
    }

    function updateQuote($ref, Request $r) {
        $r->validate([
            'name'=>'required',
            'vat'=>'required'
        ]);

        $quotation = Quotation::where('ref_no', $ref)->firstOrFail();

        $quote = Quote::where('id', $r->id)->firstOrFail();

        $quote->name = $r->name;
        $quote->vat = $r->vat;

        if($quote->save()){
            $this->evaluateTotals($quotation, $quote);
            return Inertia::flash('success', 'Quotation table updated successfully')->back();
        }
        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }

    function deleteQuote($ref, Request $r){
        $quotation = Quotation::where('ref_no', $ref)->firstOrFail();

        $quote = Quote::where('id', $r->id)->firstOrFail();


        if($quote->delete()){
            $this->evaluateQuotationTotal($quotation);
            return Inertia::flash('success', 'Quotation table deleted successfully')->back();
        }
        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }

    function evaluateQuotationTotal($quotation){
        $total = 0;
        foreach($quotation->quotes as $quote){
            $total += $quote->total;
        }
        $quotation->total = $total;
        $quotation->save();
    }

    function evaluateTotals($quotation, $quote){
        $total = 0;
        foreach($quote->quoteItems as $quoteItem){
            $total += $quoteItem->total;
        }
        $vat = ($quote->vat/100)*$total;
        $quote->total = $vat+$total;
        $quote->save();

        $total = 0;
        foreach($quotation->quotes as $quote){
            $total += $quote->total;
        }
        $quotation->total = $total;
        $quotation->save();
    }

    function updateQuoteItem($ref, Request $r){
        $r->validate([
            'description'=>'required',
            'total'=>'required'
        ]);

        $quotation = Quotation::where('ref_no', $ref)->firstOrFail();

        $quoteItem = QuoteItem::where('id', $r->id)->firstOrFail();
        $quote = $quoteItem->quote;

        $quote->total -= $quoteItem->total;

        $quoteItem->quantity = $r->quantity;
        $quoteItem->description = $r->description;
        $quoteItem->unit_price = $r->unitPrice;
        $quoteItem->total = $r->total;

        if($quoteItem->save()) {
            $this->evaluateTotals($quotation, $quote);
            return Inertia::flash('success', 'Quote Item updated successfully')->back();
        }

        throw ValidationException::withMessages(['description'=>'Something went wrong']);
    }

    function deleteQuoteItem($ref, Request $r){
        $r->validate([
            'id'=>'required',
        ]);

        $quotation = Quotation::where('ref_no', $ref)->firstOrFail();

        $quoteItem = QuoteItem::where('id', $r->id)->firstOrFail();
        $quote = $quoteItem->quote;

        $quote->total -= $quoteItem->total;


        if($quoteItem->delete()) {
            $this->evaluateTotals($quotation, $quote);
            return Inertia::flash('success', 'Quote Item deleted successfully')->back();
        }

        throw ValidationException::withMessages(['description'=>'Something went wrong']);
    }

    function pdfDownload($ref){
        $quotation = Quotation::where('ref_no', $ref)->firstOrFail();

        $pdf = new QuotationPDF($quotation);
        $pdf->AddPage();

        $fileName = $quotation->ref_no.".pdf";
        $file= public_path()."/".$fileName;
        $pdf->output('F', $file);
        $headers = ['ContentType: application/pdf'];
        return Response::download($file, $fileName, $headers);
    }
}
