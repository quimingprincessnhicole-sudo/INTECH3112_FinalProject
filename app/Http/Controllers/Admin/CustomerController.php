<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
        $customers = User::where('role', 'customer')
            ->latest()
            ->get([
                'id',
                'name',
                'first_name',
                'last_name',
                'email',
                'phone',
                'address',
                'created_at',
            ]);

        return Inertia::render('Admin/Customers', [
            'customers' => $customers,
        ]);
    }
}
