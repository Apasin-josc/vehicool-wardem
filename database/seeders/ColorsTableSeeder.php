<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('colors')->truncate();

        $colors = [
            ['name' => 'Red',    'hex' => '#FF0000'],
            ['name' => 'Black',  'hex' => '#000000'],
            ['name' => 'White',  'hex' => '#FFFFFF'],
            ['name' => 'Blue',   'hex' => '#0000FF'],
            ['name' => 'Yellow', 'hex' => '#FFFF00'],
        ];

        foreach ($colors as $color) {
            DB::table('colors')->insert([
                'name'       => $color['name'],
                'hex'        => $color['hex'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
