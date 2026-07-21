<?php
namespace App\PDF;

use App\Models\Admin;
use DateTimeZone;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class ReceiptPDF extends FPDF {
    public $name = '';
    public $branch = '';
    public $phone1 = '';
    public $phone2 = '';
    public $refNo = '';

    public $receipt;

    public $clientName = '';
    public $clientPhone = '';
    public $pickupDate = '';

    function __construct($sale, $orientation = 'P', $unit = 'mm', $size = [80, 297]){
        parent::__construct($orientation, $unit, $size);
        $this->SetMargins(3, 3, 3, 3);
        $this->receipt = $sale;

        $this->name = config('app.name');
        $this->branch = "Al-Mubarak Building, 2nd Floor";
        $this->phone1 = '0725 664 460 / 0725 664 589';
    }

    function body() {
        $this->setFont('Arial', 'B', 12);
        $this->image(public_path().'/receipt-logo.png',30,0,25,25);
        $this->ln(15);
        $this->cell(0,4, $this->name, 0,1,'C');
        $this->setFont('Arial','B', 10);
        $this->cell(0, 4, $this->branch, 0, 1, 'C');
        $this->cell(0, 4, "Eastleigh, Nairobi", 0, 1, 'C');
        $this->cell(0,4, $this->phone1, 0, 1,'C');

        $this->ln(3);
        $this->SetFont('Arial', 'B', 10);
        $this->cell(0, 5, 'RECEIPT', 0, 1, 'C');
        $this->cell(0, 5, 'REF NO. '.$this->receipt->ref_no, 0, 1,'L');

        if($this->receipt->status == 0){
            $this->image(public_path().'/cancelled.png',0,6,80,100);
        }

        $this->ln(2);
        $this->setFont('Arial', '', 10);
        $this->cell(0, 5, 'Client Name: '.$this->receipt->name, 0, 1, 'L');
        $this->cell(0, 5, 'Client Phone: '.$this->receipt->phone, 0, 1, 'L');

        $this->ln(2);
        $date = Carbon::now(new DateTimeZone('Africa/Nairobi'));
        $this->cell(0, 4, "Printed Date: ".$date->format('d-m-Y'), 0, 1, 'L');
        $this->cell(0, 4, "Transaction Date: ".$date->format('d-m-Y'), 0, 1, 'L');
        if($this->receipt->status == 0){
            $this->cell(0, 4, "Cancellation Date: ".$this->receipt->updated_at->format('d-m-Y'), 0, 1, 'L');
        }
        $this->ln(2);

        $this->table();

        $this->foot();
    }

    function table() {
        // $this->cell(0, 4, "Item Count: ".$this->receipt->receiptItems->count(), 0, 1);
        // $this->ln(3);
        $this->setFont('Arial', 'B', 9);

        # table header
        $this->cell(35, 5, 'LINEN', 'TB', 0, 'L');
        // $this->cell(15, 5, 'JOB', 'TB', 0, 'C');
        $this->cell(15, 5, 'PRICE', 'TB', 0, 'R');
        $this->cell(10, 5, 'QTY', 'TB', 0, 'R');
        $this->cell(15, 5, 'TOTAL', 'TB', 1, 'R');

        $this->setFont('Arial', '', 9);

        $total = 0;
        foreach($this->receipt->receiptItems as $receiptItem){
            if(strlen($receiptItem->name) < 25){
                $this->Cell(35,4,$receiptItem->name, 0, 0, 'L');
                // $this->cell(35,4, '', 0, 1, 'L');
                // $this->cell(15,5, $saleItem->job, 0, 0, 'L');
                $this->cell(15,4, $receiptItem->unitPrice, 0, 0, 'R');
                $this->cell(10,4, $receiptItem->qty, 0, 0, 'R');
                // total += float(item[4])
                $this->cell(15,4, $receiptItem->total, 0, 1, 'R');
            }else{
                $this->Cell(35,4,substr( $receiptItem->name, 0, 25), 0, 0, 'L');
                $this->cell(15,4, $receiptItem->unitPrice, 0, 0, 'R');
                $this->cell(10,4, $receiptItem->qty, 0, 0, 'R');
                // total += float(item[4])
                $this->cell(15,4, $receiptItem->total, 0, 1, 'R');
                $this->Cell(0,4,substr( $receiptItem->name, 25, 25), 0, 1, 'L');
            }


            $total += $receiptItem->total;
        }

		$this->setFont('Arial', 'B', 9);
		$this->cell(45, 4, 'TOTAL', 'T', 0,'L');
		$this->cell(30, 4, "KSH ".$total, 'T', 1,'R');
		$this->cell(45, 4, 'AMOUNT PAID', 0, 0,'L');
		$this->cell(30, 4, 'KSH '.$this->receipt->amount, 0, 1,'R');
		// $this->cell(45, 4, 'BALANCE', 0, 0,'L');
		// $this->cell(30, 4, 'KSH '.$this->receipt->total - $this->receipt->deposit, 0, 1,'R');

        $this->ln(2);
        // $this->cell(0, 4, 'Pay via Buy Goods, Till Number: 4790078');
    }

    function foot() {
        $this->setFont('Arial', '', 9);
		$this->ln(5);
		// $this->cell(80, 3, "1.In the event of any damage reported within 24", 0, 1, 'L');
		// $this->cell(80, 3, "   hrs of the pickup date, the client will receive  ", 0, 1, 'L');
		// $this->cell(80, 3, "  refund of the total price of the linen.", 0, 1, 'L');
		// $this->cell(80, 3, "2.Failure to collect your linen within 14 days", 0, 1, 'L');
		// $this->cell(80, 3, "  of the above pickup date, management will be ", 0, 1, 'L');
		// $this->cell(80, 3, "  forced to dispose the item(s) to charity. ", 0, 1, 'L');
		// $this->cell(80, 3, "  Management  shall not be liable for the cost of", 0, 1, 'L');
		// $this->cell(80, 3, "  the disposed linen or any refunds. Failure to ", 0, 1, 'L');
		// $this->cell(80, 3, "  collect your linen within 14 days of the above", 0, 1, 'L');
		// $this->cell(80, 3, "   pickup date.", 0, 1, 'L');

		$this->ln(2);
		$this->setFont('Arial', '',10);
		$this->cell(0, 4, "Served By: ".Admin::where('id', $this->receipt->staff_id)->first()->username, 0, 1, '');
		$this->ln(4);
		$this->setFont('Arial', 'B', 10);
		$this->cell(0, 5, 'Eagleware', 'T', 0, 'C');
    }
}
