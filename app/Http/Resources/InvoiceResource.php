<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
            'clientId'=>$this->client_id,
            'client'=>new ClientResource($this->client),
            'staff'=> new StaffResource($this->staff),
            'createdBy'=>$this->staff->username,
            'currency'=>$this->currency,
            'total'=>$this->total,
            'status'=>$this->status,
        ];
    }
}
