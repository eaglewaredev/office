<?php

namespace Database\Seeders;

use App\Models\Number;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $staff = new Staff();
        // $staff->ref_no = '0001';
        // $staff->name = 'Chancel';
        // $staff->username = '@chancel';
        // $staff->email = 'chancel100@gmail.com';
        // $staff->phone = '0714026260';
        // $staff->password = Hash::make('overlord');
        // $staff->admin = 1;

        // $staff->save();

        $num = new Number();
        $num->name = 'Quotation';
        $num->prefix ='QQ';
        $num->num = 0;
        $num->save();

        $num = new Number();
        $num->name = 'Invoice';
        $num->prefix ='INV';
        $num->num = 0;
        $num->save();

        $num = new Number();
        $num->name = 'Receipt';
        $num->prefix ='RR';
        $num->num = 0;
        $num->save();
    }
}
