<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\User\ProductController as UserProductController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\OrderController as UserOrderController;

// Public homepage
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Customer home
Route::get('/home', function () {
    return Inertia::render('User/Home', [
        'featuredProducts' => Product::where('is_archived', false)
            ->where('stock', '>', 0)
            ->latest()
            ->take(4)
            ->get(),
    ]);
})->middleware('auth')->name('user.home');

// About page
Route::get('/about', function () {
    return Inertia::render('User/About');
})->middleware('auth')->name('user.about');

// Products
Route::get('/products', [UserProductController::class, 'index'])
    ->name('products.index');

Route::get('/products/{slug}', [UserProductController::class, 'show'])
    ->name('products.show');

// Cart
Route::get('/cart', [CartController::class, 'index'])
    ->name('cart.index');

Route::post('/cart/{product}', [CartController::class, 'add'])
    ->name('cart.add');

Route::patch('/cart/{product}', [CartController::class, 'update'])
    ->name('cart.update');

Route::delete('/cart/{product}', [CartController::class, 'remove'])
    ->name('cart.remove');

// Checkout
Route::post('/checkout', [CartController::class, 'checkout'])
    ->middleware('auth')
    ->name('checkout.store');

// Customer order history
Route::get('/my-orders', [UserOrderController::class, 'index'])
    ->middleware('auth')
    ->name('user.orders.index');

// Authentication
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login.store');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

// Admin routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Home', [
            'stats' => [
                'totalProducts' => Product::where('is_archived', false)->count(),
                'pendingOrders' => Order::where('status', 'pending')->count(),
                'totalCustomers' => User::where('role', 'customer')->count(),
            ],
            'recentProducts' => Product::where('is_archived', false)
                ->latest()
                ->take(4)
                ->get(),
            'recentOrders' => Order::with('user')
                ->latest()
                ->take(5)
                ->get(),
        ]);
    })->name('admin.home');

    // Admin products
    Route::get('/admin/products', [ProductController::class, 'index'])
        ->name('admin.products.index');

    Route::post('/admin/products', [ProductController::class, 'store'])
        ->name('admin.products.store');

    Route::put('/admin/products/{product}', [ProductController::class, 'update'])
        ->name('admin.products.update');

    Route::patch('/admin/products/{product}/archive', [ProductController::class, 'archive'])
        ->name('admin.products.archive');

    Route::patch('/admin/products/{product}/restore', [ProductController::class, 'restore'])
        ->name('admin.products.restore');

    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])
        ->name('admin.products.destroy');

    // Admin orders
    Route::get('/admin/orders', [OrderController::class, 'index'])
        ->name('admin.orders.index');

    Route::patch('/admin/orders/{order}/status', [OrderController::class, 'updateStatus'])
        ->name('admin.orders.update-status');

    // Admin customers
    Route::get('/admin/customers', [CustomerController::class, 'index'])
        ->name('admin.customers.index');
});

// Registration
Route::get('/register', [RegisteredUserController::class, 'create'])
    ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->name('register.store');
