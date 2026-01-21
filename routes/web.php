<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/calendar', [TaskController::class, 'index'])->middleware(['auth', 'verified'])->name('calendar');



Route::get('/products', [ProductController::class, 'index'])->middleware(['auth', 'verified'])->name('products');
Route::post('/products', [ProductController::class, 'store'])->middleware(['auth', 'verified'])->name('products.store');
Route::delete('/products/{product}', [ProductController::class, 'destroy'])->middleware(['auth', 'verified'])->name('products.destroy');
Route::put('/products/{product}', [ProductController::class, 'update'])->middleware(['auth', 'verified'])->name('products.update');



Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::put('/tasks/{task}', [TaskController::class, 'update'])->middleware(['auth', 'verified'])->name('tasks.update');
Route::delete('/tasks/{task}/products/{product}', [TaskController::class, 'detachProduct'])->name('tasks.products.detach');

require __DIR__ . '/auth.php';
