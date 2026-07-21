<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'quotationId'=>$this->quotation_id,
            'staff'=>new StaffResource($this->staff),
            'name'=> $this->name,
            'vat'=>$this->vat,
            'total'=>$this->total,
            'quoteItems'=>new QuoteItemCollection($this->quoteItems),
        ];
    }
}
