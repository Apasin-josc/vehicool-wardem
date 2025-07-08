<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            ['Mazda', 'CX-5'],
            ['Audi', 'A4'],
            ['Volkswagen', 'Jetta'],
            ['Volkswagen', 'Passat'],
            ['GMC', 'Canyon'],
            ['GMC', 'Sierra 1500'],
            ['Ford', 'Mustang'],
            ['Ford', 'Escape'],
            ['Ford', 'Expedition'],
            ['Chevrolet', 'Durango'],
            ['Toyota', 'Prius'],
        ];

        $colors = ['White', 'Black', 'Gray', 'Silver', 'Blue', 'Red', 'Green', 'Beige'];

        foreach ($cars as [$manufacturer, $model]) {
            Car::create([
                'plate_number' => $this->generateSpanishPlate(),
                'manufacturer' => $manufacturer,
                'model' => $model,
                'color' => $colors[array_rand($colors)],
            ]);
        }
    }

    private function generateSpanishPlate(): string
    {
        // Formato: 1234 ABC
        $numbers = rand(1000, 9999);
        $letters = strtoupper(chr(rand(65, 90)) . chr(rand(65, 90)) . chr(rand(65, 90)));
        return "$numbers $letters";
    }
}
