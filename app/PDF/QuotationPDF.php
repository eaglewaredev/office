<?php
namespace App\PDF;

use Illuminate\Support\Facades\Auth;

// use Override;

class QuotationPDF extends FPDF{
    public $quotation;

    public $subTotal=0;
    public $vatTotal=0;
    public $total=0;

    // #[Override]
    function __construct($quotation, $orientation = 'P', $unit = 'mm', $size = 'A4',){
        parent::__construct($orientation, $unit, $size);

        $this->quotation = $quotation;
    }

    function header(){
        $this->Image(public_path().'/doremcy-logo.jpg', 0, 0, 220, 40);
        $this->Ln(35);

        $this->setFont('Arial', 'B',15);
        $this->cell(0, 10, 'QUOTATION', 0, 1, 'C');
        $this->setFont('Arial', 'B',10);
        // $this->cell(193, 5, 'PIN NO. P0515638501', 0, 1, 'C');
        // $this->cell(193, 5, 'KRA/EFP/02022009/01146K', 0, 1, 'C');

        $this->setFont('Arial', 'B', 7);
        $this->cell(110, 4, 'Client', 'TLR', 0);
        $this->cell(43, 4, 'Date Created', 'TR', 0);
        $this->cell(40, 4, 'Valid Until', 'TLR', 1);
        $this->setFont('Arial', '', 7);
        $this->cell(110, 4, 'Name: '.$this->quotation->client->company_name, 'LR', 0);
        $this->cell(43, 4, $this->quotation->created_at->format('d-m-Y'), 'RB', 0);
        $this->cell(40, 4,$this->quotation->due_date, 'BLR', 1);

        $this->cell(110, 4, 'Phone: '.$this->quotation->client->phone1, 'LR', 0);
        $this->setFont('Arial', 'B', 6);
        $this->cell(83, 4, 'Quotation Ref No', 'R', 1);

        $this->setFont('Arial', '', 7);
        $this->cell(110, 4, 'PIN: '.$this->quotation->client->pin, 'LR', 0);
        $this->cell(83, 4, $this->quotation->ref_no, 'R', 1);

        $this->setFont('Arial', 'B', 6);
        $this->cell(193, 4, 'Authorised By ', 'LTR', 1);
        $this->cell(193, 4, Auth::guard('staff')->user()->name, 'LBR', 1);

        // $this->cell(53, 4, 'Quotation Ref No', 'TR', 0);
        // $this->cell(30, 4, 'Transit Ref No', 'TR', 1);
        // $this->setFont('Arial', '', 6);
        // $this->cell(110, 4, Auth::guard('staff')->user()->name, 'LBR', 0);
        // $this->cell(53, 4, $this->quotation->ref_no, 'RB', 0);
        // $this->cell(30, 4,$this->quotation->ref_no,'RB',1);

        // $this->setFont('Arial', 'B', 6);
        // $this->cell(50,5, 'Authorised By', 'LR', 0);
        // $this->cell(143,5, '', 'LR', 1);
        // $this->cell(83,5, 'Authorised By.', 'LR', 1);
        // $this->setFont('Arial', '', 6);
        // $this->cell(50,5, Auth::guard('staff')->user()->name, 'LRB', 0);
        // $this->cell(143,5, '', 'LRB', 1);
        // $this->cell(143,5, 'Richard Mutisya', 'LRB', 1);
        $this->ln();

        $index = 1;
        foreach($this->quotation->quotes as $quote){
            $this->quoteTable($index, $quote);
            $this->ln(5);
            $index +=1;
        }

        $this->grandSummary();
    }

    function quoteTable($index, $quote){
        $this->setFont('Arial', 'B', 12);
        $this->cell(0, 5, $index.'.'.$quote->name, 0, 1);

        $quoteItems = $quote->quoteItems;

        $qty = true;
        $unitPrice = true;
        if(count($quoteItems) > 0){
            $quoteItem = $quoteItems[0];


            $qty = $quoteItem->quantity ? true : false;
            $unitPrice = $quoteItem->unit_price ? true : false;
        }


        $this->setFont('Arial', 'B', 9);
        if($qty){
            $this->cell(20, 5, 'QTY', 1, 0, 'C');
        }

        $this->cell(90, 5, 'DESCRIPTION', 1, 0, 'C');
        if($unitPrice){
        $this->cell(40, 5, 'UNIT PRICE', 1, 0, 'C');
        }
        $this->cell(43, 5, 'TOTAL', 1, 1, 'C');

        // table body
        $this->setFont('Arial', '', 9);
        $subTotal = 0;
        foreach($quote->quoteItems as $quoteItem){
            if($qty){
                $this->cell(20, 5, $quoteItem->quantity, 'LRB', 0);
            }
            $this->cell(90, 5, $quoteItem->description, 'LRB', 0);
            if($unitPrice){
                $this->cell(40, 5, number_format($quoteItem->unit_price), 'LRB', 0,'R');
            }
            $this->cell(43, 5, number_format($quoteItem->total),'LRB', 1, 'R');
            $subTotal += $quoteItem->total;
        }

        $vat = ($quote->vat/100)*$subTotal;

        // $this->cell(20, 5, '', 'LBR', 0, 'C');
        // $this->cell(90, 5, '', 'LBR', 0, 'L');
        // $this->cell(40, 5, '', 'LBR', 0, 'R');
        // $this->cell(43, 5, '', 'LBR', 1, 'R');
        $this->cell(20, 5, '', 0, 0, 'C');
        $this->cell(90, 5, '', 0, 0, 'C');
        $this->setFont('Arial', 'B', 9);
        $this->cell(40, 5, 'SUB-TOTAL', 'LBR', 0, 'C');
        $this->cell(43, 5, number_format($subTotal), 'LBR', 1, 'R');
        $this->cell(20, 5, '', 0, 0, 'C');
        $this->cell(90, 5, '', 0, 0, 'C');
        $this->cell(40, 5, "VAT ({$quote->vat}%)", 'LBR', 0, 'C');
        $this->cell(43, 5, number_format($vat), 'LBR', 1, 'R');
        $this->cell(20, 5, '', 0, 0, 'C');
        $this->cell(90, 5, '', 0, 0, 'C');
        $this->setFont('Arial', 'B', 9);
        $this->cell(40, 5, "TOTAL ({$this->quotation->currency})", 'LBR', 0, 'C');
        $this->cell(43, 5, number_format($quote->total), 'LBR', 0, 'R');


        $this->ln();
    }

    function grandSummary(){
        $this->setFont('Arial', 'B', 9);
        $this->cell(20, 5, 'No', 1, 0, 'C');
        $this->cell(90, 5, 'DESCRIPTION', 1, 0, 'C');
        $this->cell(40, 5, 'Total', 1,  1, 'C');


        $this->setFont('Arial', '', 9);
        $total = 0;
        $index = 1;
        foreach($this->quotation->quotes as $quote){
            $this->cell(20, 5, $index.".", 1, 0);
            $this->cell(90, 5, $quote->name, 1, 0);
            $this->cell(40, 5, $this->quotation->currency.' '.number_format($quote->total), 1,1, 'R');
            $total += $quote->total;
            $index += 1;
        }
        $this->setFont('Arial', 'B', 9);
        $this->cell(20, 5, "", 'LB', 0);
        $this->cell(90,5, 'TOTAL', 1, 0, 'C');
        $this->cell(40, 5, $this->quotation->currency.' '.number_format($total), 1,1, 'R');

        // foreach($this->invoiceCharges as $invoice):
        //     $this->cell(20, 4, $invoice['quantity'], 'LR', 0, 'C');
        //     $this->cell(90, 4, $invoice['description'], 'LR', 0, 'L');
        //     $this->cell(40, 4, $invoice['unit'], 'LR', 0, 'R');
        //     $this->cell(43, 4, $invoice['total'], 'LR', 1, 'R');
        // endforeach;

        // $length=5-count($this->invoiceCharges);
        // for($i=0; $i < $length; ++$i):
        //     $this->cell(20, 4, '', 'LR', 0, 'C');
        //     $this->cell(90, 4, '', 'LR', 0, 'L');
        //     $this->cell(40, 4, '', 'LR', 0, 'R');
        //     $this->cell(43, 4, '', 'LR', 1, 'R');
        // endfor;
        // $this->cell(20, 4, '', 'LBR', 0, 'C');
        // $this->cell(90, 4, '', 'LBR', 0, 'L');
        // $this->cell(40, 4, '', 'LBR', 0, 'R');
        // $this->cell(43, 4, '', 'LBR', 1, 'R');
        // $this->cell(20, 4, '', 0, 0, 'C');
        // $this->cell(90, 4, '', 0, 0, 'C');
        // $this->setFont('Arial', 'B', 7);
        // $this->cell(40, 4, 'SUB-TOTAL', 'LBR', 0, 'C');
        // $this->cell(43, 4, $this->subTotal, 'LBR', 1, 'R');
        // $this->cell(20, 4, '', 0, 0, 'C');
        // $this->cell(90, 4, '', 0, 0, 'C');
        // $this->cell(40, 4, "VAT ({$this->quotation->vat}%)", 'LBR', 0, 'C');
        // $this->cell(43, 4, $this->vatTotal, 'LBR', 1, 'R');
        // $this->cell(20, 4, '', 0, 0, 'C');
        // $this->cell(90, 4, '', 0, 0, 'C');
        // $this->setFont('Arial', 'B', 7);
        // $this->cell(40, 4, "TOTAL ({$this->quotation->currency})", 'LBR', 0, 'C');
        // $this->cell(43, 4, $this->total, 'LBR', 0, 'R');
    }

    function footer(){
        $this->Image(public_path().'/stamp.png', 140, 250, 50, 40);
        // $this->Image(public_path().'/sign.png',110,240,50,40);
        $this->SetY(-35);
        $this->setFont('Arial', 'B', 6);
        $this->cell(50, 4, 'Bank Name', 'TLR', 0);
        $this->cell(60, 4, 'Account Name', 'TLR', 0);
        $this->cell(83, 4, '', 'TR', 1);
        $this->setFont('Arial', '', 6);
        $this->cell(50, 4, 'Bank Name', 'LR', 0);
        $this->cell(60, 4, 'Company Name', 'LR', 0);
        $this->cell(83, 4, '', 'R', 1);
        $this->setFont('Arial', 'B', 6);
        $this->cell(50, 4, 'Account Number', 'TLR', 0);
        $this->cell(60, 4, 'Bank Code', 'TLR', 0);
        $this->cell(83, 4, '', 'R', 1);
        $this->setFont('Arial', '', 6);
        $this->cell(50, 4, '000000000000000', 'LBR', 0);
        $this->cell(60, 4, '68', 'LBR', 0);
        $this->cell(83, 4, '', 'R', 1);
        $this->setFont('Arial', 'B', 6);
        $this->cell(50, 4, 'Branch Name', 'TLR', 0);
        $this->cell(60, 4, 'Swift Code', 'TLR', 0);
        $this->setFont('Arial', '', 6);
        $this->cell(83, 4, '______________________________________________', 'R', 1,'C');
        $this->setFont('Arial', '', 6);
        $this->cell(50, 4, 'Eastleigh Branch', 'LBR', 0);
        $this->cell(60, 4, 'SWIFT', 'LBR', 0);
        $this->cell(83, 4, 'Signature/Impression', 'RB', 1, 'C');

        // $this->setY(-10);
        // $this->Image(public_path().'/footer.jpg', 0, 280, 220, 10);
    }
}
