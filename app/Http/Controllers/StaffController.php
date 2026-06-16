<?php

namespace App\Http\Controllers;

use App\Http\Resources\StaffCollection;
use App\Mail\NewStaffAccount;
use App\Models\Staff;
use App\Mail\VerificationCode;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        // Log::channel('stderr')->info(Staff::orderBy('id', 'desc')->get());
        return Inertia::render(
            'staff/index', [
                'staffs' => new StaffCollection(Staff::orderBy('id', 'desc')->get()),
            ]
        );
    }

    public function newStaff()
    {
        return Inertia::render(
            'staff/new'
        );
    }

    function show($ref) {
        Inertia::flash('success', 'Staff created successfully');
        return Inertia::render(
            'staff/show',
            [
                'staff'=>Staff::where('ref_no', $ref)->firstOrFail(),
            ]
        );
    }

    function updateStaff($id,Request $r){
        $r->validate([
            'name'=>'required',
            'username'=>'required',
            'email'=>'required|email',
            'phone'=>'required',
        ]);

        $staff = Staff::where('id', $id)->firstOrFail();

        $staff->name = $r->name;
        $staff->username= $r->username;
        $staff->email = $r->email;
        $staff->phone = $r->phone;
        $staff->Staff = $r->Staff;

        if($staff->save()) {
            return Inertia::flash('success', 'Staff updated successfully')->back();
        }
        throw ValidationException::withMessages(['name'=>'Something went wrong']);
    }

    function createStaff(Request $r) {
        $r->validate([
            'name'=>'required',
            'username'=>'required',
            'email'=>'required',
            'phone'=>'required',
            'admin'=>'required',
        ]);

        Log::channel('stderr')->info("create staff");

        // check if username is unique
        if(Staff::where('username', $r->username)->first()) {
            throw ValidationException::withMessages(['username'=> 'Username already taken']);
        }

        $email = strtolower($r->email);
        // check if email is verified
        if(!session('emailVerified', false)){
            throw ValidationException::withMessages(['email'=> 'Email not verified']);
        }

        // check if verified email is current email
        if(session('email', '') != strtolower($email)) {
            return ValidationException::withMessages(['email'=> 'Email verified, does not match current email']);
        }

        // check if email is verified
        if(!session('phoneVerified', false)){
            throw ValidationException::withMessages(['phone'=> 'Phone not verified']);
        }

        // check if verified email is current email
        if(session('phone', '') != $r->phone) {
            return ValidationException::withMessages(['email'=> 'Phone verified, does not match current phone']);
        }

        $Staff = new Staff();
        $Staff->ref_no = self::randomText('numeric', 6);
        $Staff->name = $r->name;
        $Staff->username = $r->username;
        $Staff->email = session('email');
        $Staff->phone = session('phone');
        $Staff->admin = $r->admin;

        $coder = self::randomText('numeric', 5);
        $Staff->password = Hash::make($coder);

        if($Staff->save()) {
            session()->forget('pCode');
            session()->forget('phone');
            session()->forget('phoneSent');
            session()->forget('code');
            session()->forget('email');
            session()->forget('emailSent');

            Mail::to(strtolower($Staff->email))->send(new NewStaffAccount($Staff->name, $Staff->username, $Staff->phone,$Staff->email,$coder));

            Inertia::flash('success', 'Staff created successfully');
            return to_route('staff.show',['ref'=>$Staff->ref_no]);
        }

        throw ValidationException::withMessages(['name'=> 'Something went wrong']);
    }

    function sendEmailCode(Request $r) {
        $r->validate([
            'email'=>'required|email',
        ]);

        $email = strtolower($r->email);

        if(Staff::where('email', $email)->first()) {
            throw ValidationException::withMessages(['email'=> 'Email already exists']);
        }

        $code = self::randomText('numeric', 6);
        Log::channel('stderr')->info($code);
        session(['code'=>$code]);
        session(['email'=>$email]);
        session(['emailSent'=>true]);


        Mail::to($email)->send(new VerificationCode($code));


        Inertia::flash(
            'success','Code sent successfully',
        );

        return back();
    }

    function validateEmailCode(Request $r) {
        $r->validate([
            'email'=>'required|email',
            'emailCode'=>'required',
        ]);

        $email = strtolower($r->email);

        // check if code was sent
        if(!session('emailSent', false)){
            throw ValidationException::withMessages(['emailCode'=> 'Verification code not sent, click send code']);
        }

        if($email != session('email')){
            throw ValidationException::withMessages(['email'=> 'Email mismatch']);
        }

        if($r->emailCode != session('code', '')) {
            throw ValidationException::withMessages(['emailCode'=> 'Wrong verification code']);
        }

        session(['emailVerified'=>true]);

        Inertia::flash(
            'success', 'Code verified successfuly'
        );

        return back();
    }

    function sendPhoneCode(Request $r) {
        $r->validate([
            'phone'=>'required|regex: /^[0-9]{10}$/',
        ]);

        if(Staff::where('phone', $r->phone)->first()) {
            throw ValidationException::withMessages(['phone'=> 'Phone already exists']);
        }

        $code = self::randomText('numeric', 6);
        Log::channel('stderr')->info($code);
        session(['pCode'=>$code]);
        session(['phone'=>$r->phone]);
        session(['phoneSent'=>true]);

        self::sendSMS($r->phone, "Your verification code is: {$code}\n\n".config('app.name'));

        Inertia::flash(
            'success','Code sent successfully',
        );

        return back();
    }

    function validatePhoneCode(Request $r) {
        $r->validate([
            'phone'=>'required|regex:/^[0-9]{10}$/',
            'phoneCode'=>'required',
        ]);
        // check if code was sent
        if(!session('phoneSent', false)){
            throw ValidationException::withMessages(['phoneCode'=> 'Verification code not sent, click send code']);
        }

        if($r->phone != session('phone')){
            throw ValidationException::withMessages(['phone'=> 'Phone mismatch']);
        }

        if($r->phoneCode != session('pCode', '')) {
            throw ValidationException::withMessages(['phoneCode'=> 'Wrong verification code']);
        }

        session(['phoneVerified'=>true]);

        Inertia::flash(
            'success', 'Code verified successfuly'
        );

        return back();
    }
}
