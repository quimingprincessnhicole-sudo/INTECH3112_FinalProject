<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Welcome');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'age' => ['required', 'integer', 'min:13', 'max:120'],
            'birth_date' => ['required', 'date', 'before:today'],
            'address' => ['required', 'string', 'max:1000'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        $user = User::create([
            'name' => $validated['first_name'] . ' ' . $validated['last_name'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'age' => $validated['age'],
            'birth_date' => $validated['birth_date'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));

        Auth::login($user);

        $request->session()->regenerate();

        return redirect('/');
    }
}
