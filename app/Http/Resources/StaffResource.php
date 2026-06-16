<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
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
            'refNo' => $this->ref_no,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'status' => $this->status,
            'admin' => $this->admin,
            'lastLogin' => $this->last_login,
            'createdAt'=> $this->created_at->format('d-m-Y'),
            'updatedAt'=>$this->updated_at->format('d-m-Y'),
        ];
    }
}
