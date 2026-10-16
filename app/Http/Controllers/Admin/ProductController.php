<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products', [
            'products' => Product::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0|max:99999999.99',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')
                ->store('products', 'public');
        }

        $validated['slug'] = Str::slug($validated['name'])
            . '-' . Str::lower(Str::random(6));

        Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product added successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0|max:99999999.99',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            'is_archived' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $validated['image'] = $request->file('image')
                ->store('products', 'public');
        } else {
            unset($validated['image']);
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function archive(Product $product)
    {
        $product->update(['is_archived' => true]);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product archived successfully.');
    }

    public function restore(Product $product)
    {
        $product->update(['is_archived' => false]);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product restored successfully.');
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product permanently deleted.');
    }
}
