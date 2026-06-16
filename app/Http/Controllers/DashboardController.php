<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render(
            'dashboard', [
                'staffCount' => Staff::where('status', 1)->count(),
            ]
        );
    }
}
