<?php

namespace App\Http\Controllers;

use App\Mail\VerificationCode;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    function login() {
        return Inertia::render(
            'login/login',
        );
    }

    function checkLogin(Request $r) {
        $r->validate([
            'username'=>'required',
            'password'=>'required',
        ]);

        $username = strtolower($r->username);

        $admin = Staff::orWhere('email', '=', $username)
            ->orWhere('username', '=', $username)
            ->orWhere('phone', '=', $username)->first();

        if(!$admin) {
            throw ValidationException::withMessages([
                'username'=>'Username not found',
            ]);
        }

        Log::channel('stderr')->info('admin exists');

        if($admin->status == 0) {
            throw ValidationException::withMessages([
                'username'=> 'Account suspended'
            ]);
        }

        if(!Hash::check($r->password, $admin->password)){
            throw ValidationException::withMessages([
                'password'=> 'Wrong password'
            ]);
        }

        $admin->last_login = now('Africa/Nairobi');
        $admin->save();

        Auth::guard('staff')->login($admin, session('rememberMe', false)); // TODO remove session put remember request in account column
        session()->regenerate();

        return to_route('dashboard');
    }

    function checkAccount() {
        return Inertia::render('login/check-account');
    }

    function accountCheck(Request $r) {
        $r->validate([
            'username'=>'required',
        ]);
        $username = strtolower($r->username);

        $admin = Staff::orWhere('email', '=', $username)
            ->orWhere('username', '=', $username)
            ->orWhere('phone', '=', $username)->first();

        if(!$admin) {
            throw ValidationException::withMessages([
                'username'=>'Username not found',
            ]);
        }

        Cookie::queue('username', $r->username, 15);
        $code = self::randomText('numeric', 6);
        session(['code'=> $code]);
        Log::channel('stderr')->info($code);

        Mail::to($admin->email)->send(new VerificationCode($code));

        return redirect()->route('verify');
    }

    function verify(Request $r) {
        $username = Cookie::get('username', '');
        $codex = session('code', '');
        if($username == '' || $codex == '') {
            return to_route('login');
        }
        Log::channel('stderr')->info($username);

        $admin = Staff::orWhere('email', '=', $username)
            ->orWhere('username', '=', $username)
            ->orWhere('phone', '=', $username)->first();

        if(!$admin) {
            return to_route('login');
        }

        return Inertia::render(
            'login/verify',
            ['email'=> $admin->email],
            );
    }

    function resendCode() {
        $code = self::randomText('numeric', 6);
        $username = Cookie::get('username', '');
        Log::channel('stderr')->info($code);

        $email = Cookie::get('username', '');

        if($email == '') {
            return to_route('login');
        }

        $admin = Staff::orWhere('email', '=', $username)
            ->orWhere('username', '=', $username)
            ->orWhere('phone', '=', $username)->first();

        if(!$admin) {
            return to_route('login');
        }

        Mail::to($admin->email)->send(new VerificationCode($code));

        // store school details in session
        session(['code'=> $code]);
        Cookie::queue('username', $username,15);
        // return $this->dispatch('flash', ["msg"=> "Code sent",'timer'=>true]);
        return Inertia::flash('success', 'Code sent successfully')->back();
    }

    function checkVerification(Request $r) {
        $r->validate([
            'otp'=>'required',
        ]);
        $username = Cookie::get('username', '');
        $codex = session('code', '');
        if($username == '' || $codex == '') {
            return to_route('login');
        }

        $username = strtolower($username);
        $admin = Staff::orWhere('email', '=', $username)
            ->orWhere('username', '=', $username)
            ->orWhere('phone', '=', $username)->first();

        if(!$admin) {
            return to_route('login');
        }

        Log::channel('stderr')->info($r->otp);

        // TODO on repeated failed attempts warn user of temporary suspension
        if($r->otp != $codex) {
            throw ValidationException::withMessages([
                'otp'=>'Wrong validation code'
            ]);
        }

        Log::channel('stderr')->info('otp is correct');

        session()->forget('code');

        Cookie::queue('username', $username,15);
        session(['changer'=>true]);


        // $admin->last_login = now('Africa/Nairobi');
        // $admin->save();

        // Auth::guard('admin')->login($admin, session('rememberMe', false)); // TODO remove session put remember request in account column
        // session()->regenerate();

        return to_route('changePassword');
    }

    function logout() {
        Auth::guard('staff')->logout();
        session()->invalidate();
        session()->regenerateToken();

        return to_route('login');
    }

    function changePassword() {
        $username = Cookie::get('username', '');
        if($username == '' ) {
            return to_route('login');
        }
        if(!session('changer', false)){
            return to_route('login');
        }
        Log::channel('stderr')->info($username);

        $admin = Staff::orWhere('email', '=', $username)
            ->orWhere('username', '=', $username)
            ->orWhere('phone', '=', $username)->first();

        if(!$admin) {
            return to_route('login');
        }

        return Inertia::render(
            'login/change-password',
            ['email'=> $admin->email],
            );
    }

    function passwordChange(Request $r) {
        $r->validate([
            'password'=>'required',
        ]);

        $username = Cookie::get('username', '');
        if($username == '' ) {
            return to_route('login');
        }
        Log::channel('stderr')->info($username);

        $admin = Staff::orWhere('email', '=', $username)
            ->orWhere('username', '=', $username)
            ->orWhere('phone', '=', $username)->first();

        if(!$admin) {
            return to_route('login');
        }
        $admin->password = Hash::make($r->password);
        $admin->save();
        session()->forget('changer');
        Inertia::flash('success', 'Password changed successfully');

        return to_route('login');
    }
}
