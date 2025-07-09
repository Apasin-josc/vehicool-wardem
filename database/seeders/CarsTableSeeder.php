<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Color;

class CarsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cars')->truncate();

        $colorIds = Color::pluck('id')->toArray();

        $cars = [
            ['plate_number' => 'AAA-111', 'model' => 'Fiesta',  'manufacturer' => 'Ford'],
            ['plate_number' => 'BBB-222', 'model' => 'Focus',   'manufacturer' => 'Ford'],
            ['plate_number' => 'CCC-333', 'model' => 'Mustang', 'manufacturer' => 'Ford'],
            ['plate_number' => 'DDD-444', 'model' => 'Corolla', 'manufacturer' => 'Toyota'],
            ['plate_number' => 'EEE-555', 'model' => 'Civic',   'manufacturer' => 'Honda'],
        ];

        foreach ($cars as $car) {
            DB::table('cars')->insert([
                'plate_number'  => $car['plate_number'],
                'model'         => $car['model'],
                'manufacturer'  => $car['manufacturer'],
                'color_id'      => $colorIds[array_rand($colorIds)],
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);
        }
    }
}
