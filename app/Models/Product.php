<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image',
        'is_archived',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_archived' => 'boolean',
        ];
    }
}
