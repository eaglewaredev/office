<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuotationResource extends JsonResource
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
            'refNo'=>$this->ref_no,
            'client'=>new ClientResource($this->client),
            'staff'=> new StaffResource($this->staff),
            'createdBy'=> $this->staff->username,
            'validityDate'=>$this->validity_date,
            'currency'=>$this->currency,
            'vat'=>$this->vat,
            'total'=>$this->total,
            'dateCreated'=>$this->created_at->format('d-m-Y'),
            'dateUpdated'=>$this->updated_at->format('d-m-Y'),
            'quotes'=> new QuoteCollection($this->quotes),
        ];
    }
}
