<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with(['user', 'items'])
            ->latest()
            ->get();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => [
                'required',
                'in:Approved,For Delivery,Delivered',
            ],
        ]);

        $order->status = $validated['status'];
        $order->save();

        return back()->with('success', 'Order status updated successfully.');
    }
}
