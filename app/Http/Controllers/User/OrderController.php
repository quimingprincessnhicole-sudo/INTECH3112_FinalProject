<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('User/Orders', [
            'orders' => $orders,
        ]);
    }
}

