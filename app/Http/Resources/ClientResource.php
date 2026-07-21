<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'companyName'=>$this->company_name,
            'contactPhone'=>$this->contact_person,
            'phone1'=>$this->phone1,
            'phone2'=>$this->phone2,
            'email'=>$this->email,
            'pin'=>$this->pin,
            'location'=>$this->location,
            'dateCreated'=>$this->created_at->format('d-m-Y H:i:s'),
            'dateUpdated'=>$this->updated_at->format('d-m-Y H:i:s'),
        ];
    }
}
