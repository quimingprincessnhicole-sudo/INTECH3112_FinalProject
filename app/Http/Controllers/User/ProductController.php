<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('is_archived', false)
            ->where('stock', '>', 0)
            ->latest()
            ->get();

        return Inertia::render('User/Products', [
            'products' => $products,
        ]);
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_archived', false)
            ->firstOrFail();

        return Inertia::render('User/ProductShow', [
            'product' => $product,
        ]);
    }
}
