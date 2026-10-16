<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        $products = Product::whereIn('id', array_keys($cart))
            ->where('is_archived', false)
            ->get()
            ->keyBy('id');

        $items = collect($cart)
            ->map(function ($quantity, $id) use ($products) {
                $product = $products->get($id);

                if (!$product) {
                    return null;
                }

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => (float) $product->price,
                    'image' => $product->image,
                    'stock' => (int) $product->stock,
                    'quantity' => min(
                        max((int) $quantity, 1),
                        (int) $product->stock
                    ),
                ];
            })
            ->filter()
            ->values();

        return Inertia::render('User/Cart', [
            'items' => $items,
        ]);
    }

    public function add(Request $request, Product $product)
    {
        if ($product->is_archived || $product->stock < 1) {
            return back()->with(
                'error',
                'This candle is currently unavailable.'
            );
        }

        $validated = $request->validate([
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);

        $quantityToAdd = (int) ($validated['quantity'] ?? 1);

        $cart = $request->session()->get('cart', []);
        $currentQuantity = (int) ($cart[$product->id] ?? 0);
        $newQuantity = $currentQuantity + $quantityToAdd;

        if ($newQuantity > $product->stock) {
            return back()->with(
                'error',
                'The requested quantity exceeds available stock.'
            );
        }

        $cart[$product->id] = $newQuantity;
        $request->session()->put('cart', $cart);

        return redirect()
            ->route('cart.index')
            ->with('success', $product->name . ' was added to your cart.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        if ($product->is_archived || $product->stock < 1) {
            return back()->with(
                'error',
                'This candle is currently unavailable.'
            );
        }

        if ($validated['quantity'] > $product->stock) {
            return back()->with(
                'error',
                'The requested quantity exceeds available stock.'
            );
        }

        $cart = $request->session()->get('cart', []);

        if (!array_key_exists($product->id, $cart)) {
            return back()->with(
                'error',
                'This candle is not in your cart.'
            );
        }

        $cart[$product->id] = (int) $validated['quantity'];
        $request->session()->put('cart', $cart);

        return back()->with('success', 'Cart quantity updated.');
    }

    public function remove(Request $request, Product $product)
    {
        $cart = $request->session()->get('cart', []);

        unset($cart[$product->id]);

        $request->session()->put('cart', $cart);

        return back()->with('success', 'Candle removed from your cart.');
    }

    public function checkout(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()
                ->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $order = DB::transaction(function () use ($cart, $user) {
            $orderItems = [];
            $total = 0;

            foreach ($cart as $productId => $quantity) {
                $product = Product::whereKey($productId)
                    ->lockForUpdate()
                    ->first();

                $quantity = filter_var(
                    $quantity,
                    FILTER_VALIDATE_INT
                );

                if (
                    !$product ||
                    $product->is_archived ||
                    $quantity === false ||
                    $quantity < 1 ||
                    $product->stock < $quantity
                ) {
                    throw ValidationException::withMessages([
                        'checkout' =>
                            'A candle is unavailable or there is not enough stock. Please review your cart.',
                    ]);
                }

                $unitPrice = (float) $product->price;
                $total += $unitPrice * $quantity;

                $orderItems[] = [
                    'product' => $product,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                ];
            }

            $order = Order::create([
                'order_number' => 'CAN-' .
                    now()->format('Ymd') . '-' .
                    strtoupper(Str::random(6)),
                'user_id' => $user->id,
                'total_amount' => round($total, 2),
                'status' => 'pending',
                'payment_method' => 'Cash on Delivery',
            ]);

            foreach ($orderItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product']->id,
                    'product_name' => $item['product']->name,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                ]);

                $item['product']->decrement(
                    'stock',
                    $item['quantity']
                );
            }

            return $order;
        }, 3);

        $request->session()->forget('cart');

        return redirect()
            ->route('cart.index')
            ->with(
                'success',
                'Your order ' . $order->order_number .
                    ' was placed successfully!'
            );
    }
}
