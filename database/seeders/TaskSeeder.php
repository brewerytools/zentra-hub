<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          Task::factory(10)->create()->each(function($task) {
            $products = Product::inRandomOrder()->take(3)->pluck('id');
            $task->products()->attach($products);
        });
    }
}
