<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    $cars = Car::all();

    return response()->json([
        'data' => $cars,
        'message' => 'Car list retrieved successfully.',
    ], 200);
    
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'plate_number'  => 'required|string|unique:cars,plate_number',
            'manufacturer'  => 'required|string',
            'model'         => 'required|string',
            'color'         => 'required|string',
        ], [
            'plate_number.unique' => 'This plate number has already been registered.',
            'plate_number.required' => 'You must specify a plate number with four numbers and three letters.',
        ]);

        $car = Car::create($validated);

        return response()->json([
            'data'    => $car,
            'message' => 'Car registered successfully.',
        ], 201);
    }

}
