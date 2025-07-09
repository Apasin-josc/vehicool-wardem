<?php
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\ColorController;

use Illuminate\Support\Facades\Route;

Route::get('/cars', [CarController::class, 'index']);
Route::post('/cars', [CarController::class, 'store']);
Route::get('/colors', [ColorController::class, 'index']);