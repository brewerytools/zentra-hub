<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory; 

    protected $table = 'tasks';

    protected $fillable = [
        'name',
        'day_of_registration',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
 public function products()
{
    return $this->belongsToMany(Product::class)
                ->withPivot('quantity') 
                ->withTimestamps();
}


}
