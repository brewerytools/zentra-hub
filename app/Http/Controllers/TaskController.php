<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $lists = Task::with(['user', 'products'])->get();

        return Inertia::render('Calendar/Index', [
            'lists' => $lists,
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'day_of_registration' => 'required|date',
            'products' => 'array',
        ]);

        $task = Task::create([
            'name' => $request->name,
            'day_of_registration' => $request->day_of_registration,
            'user_id' => auth()->id(),
        ]);

        if ($request->has('products')) {
            $syncData = [];

            foreach ($request->products as $product) {
                $syncData[$product['id']] = [
                    'quantity' => $product['quantity'] ?? 1,
                ];
            }

            $task->products()->attach($syncData);
        }

        return redirect()->back();
    }

    public function update(Request $request, Task $task)
    {
        $task->update([
            'name' => $request->name,
            'day_of_registration' => $request->day_of_registration,
            'user_id' => auth()->id(),
        ]);

        if ($request->has('products')) {
            $syncData = [];
            foreach ($request->products as $product) {
                $syncData[$product['id']] = [
                    'quantity' => $product['quantity'] ?? 1,
                ];
            }
            $task->products()->sync($syncData);
        }

        return redirect()->route('calendar');
    }

    public function detachProduct(Task $task, Product $product)
    {
        $task->products()->detach($product->id);

        return redirect()->back();
    }
}
