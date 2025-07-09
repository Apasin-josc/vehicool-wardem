<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $fillable = ['name', 'hex'];

    /**
     *a color can be applied to many cars
     */
    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
