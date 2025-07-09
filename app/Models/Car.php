<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    /** @use HasFactory<\Database\Factories\CarFactory> */
    use HasFactory;

    protected $fillable = [
        'plate_number',
        'model',
        'manufacturer',
        'color_id',
    ];
    public function color()
    {
        return $this->belongsTo(Color::class);
    }
}
