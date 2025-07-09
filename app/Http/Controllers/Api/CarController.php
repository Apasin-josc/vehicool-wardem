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
        $cars = Car::with('color')
                   ->orderBy('created_at', 'desc')
                   ->paginate(8);

        return response()->json([
            'data' => $cars->items(),
            'meta' => [
                'current_page' => $cars->currentPage(),
                'last_page'    => $cars->lastPage(),
                'per_page'     => $cars->perPage(),
                'total'        => $cars->total(),
            ],
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'plate_number' => [
                'required',
                'string',
                'unique:cars,plate_number',
                'regex:/^[0-9]{4}\s?[A-Z]{3}$/'
            ],
            'manufacturer' => 'required|string',
            'model'        => 'required|string',
            'color_id'     => 'required|exists:colors,id',
        ], [
            'plate_number.unique'   => 'This plate number has already been registered.',
            'plate_number.required' => 'You must specify a plate number with four numbers and three letters.',
            'plate_number.regex'    => 'Plate must be 4 digits and 3 uppercase letters (e.g. 1234 ABC).',
            'color_id.required'     => 'You must select a valid color.',
            'color_id.exists'       => 'The selected color is invalid.',
        ]);

        // 2) Creamos el coche, asignando color_id
        $car = Car::create($validated);

        // 3) Cargamos la relación para devolverla en la respuesta
        $car->load('color');

        return response()->json([
            'data'    => $car,
            'message' => 'Car registered successfully.',
        ], 201);
    }
}
