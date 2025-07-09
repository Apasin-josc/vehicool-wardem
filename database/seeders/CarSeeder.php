<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;
use App\Models\Color;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        Car::truncate();

        $colorIds = Color::pluck('id')->toArray();

        $cars = [
            ['Mazda',       'CX-5'],
            ['Audi',        'A4'],
            ['Volkswagen',  'Jetta'],
            ['Volkswagen',  'Passat'],
            ['GMC',         'Canyon'],
            ['GMC',         'Sierra 1500'],
            ['Ford',        'Mustang'],
            ['Ford',        'Escape'],
            ['Ford',        'Expedition'],
            ['Chevrolet',   'Durango'],
            ['Toyota',      'Prius'],
        ];

        foreach ($cars as [$manufacturer, $model]) {
            Car::create([
                'plate_number' => $this->generateSpanishPlate(),
                'manufacturer' => $manufacturer,
                'model'        => $model,
                'color_id'     => $colorIds[array_rand($colorIds)],
            ]);
        }
    }

    private function generateSpanishPlate(): string
    {
        $numbers = rand(1000, 9999);
        $letters = strtoupper(
            chr(rand(65, 90))
            . chr(rand(65, 90))
            . chr(rand(65, 90))
        );
        return "$numbers $letters";
    }
}
