<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ClientController extends Controller
{
    function index(){
        return Inertia::render(
            'client/index',[
                'clients'=>new ClientCollection(
                    Client::orderBy('id', 'desc')->get()
                    )
            ]
        );
    }

    function createClient(Request $r){
        $r->validate([
            'companyName'=>'required',
        ]);

        $client = new Client();
        $client->ref_no = self::randomText('numeric', 6);
        $client->company_name = $r->companyName;
        $client->contact_person = $r->contactPerson;
        $client->phone1 = $r->phone1;
        $client->phone2 = $r->phone2;
        $client->email = $r->email;
        $client->pin = $r->pin;
        $client->location = $r->location;

        if($client->save()){
            Inertia::flash('success', 'Cliet created successfully');
            return redirect('client.show', ['ref'=>$client->ref_no]);
        }
        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }

    function show($ref) {
        return Inertia::render(
            'client/show',[
                'client'=>new ClientResource(Client::where('ref_no', $ref)->firstOrFail()),
            ]
        );
    }

    function updateClient($ref, Request $r) {
        $r->validate([
            'companyName'=>'required'
        ]);
        $client = Client::where('ref_no', $ref)->firstOrFail();

        $client->company_name = $r->companyName;
        $client->contact_person = $r->contactPerson;
        $client->phone1 = $r->phone1;
        $client->phone2 = $r->phone2;
        $client->email = $r->email;
        $client->pin = $r->pin;
        $client->location = $r->location;

        if($client->save()) {
            return Inertia::flash('success', 'Client updated successfully')->back();
        }
        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }
}
