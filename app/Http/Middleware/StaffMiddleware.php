<?php

namespace App\Http\Middleware;

use App\Models\Staff;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class StaffMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Auth::guard('staff')->check()){
            return to_route('login');
        }

        if(Auth::guard('staff')->user()->status != 1){
            return to_route('login')->with('status', 'Staff account suspended');
        }

        $staff = Auth::guard('staff')->user();

        Inertia::share('staff', $staff);

        return $next($request);
    }
}
