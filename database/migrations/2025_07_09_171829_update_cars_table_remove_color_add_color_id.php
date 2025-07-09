<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn('color');

            $table->foreignId('color_id')
                  ->nullable()               
                  ->constrained('colors')
                  ->onDelete('set null');   
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropConstrainedForeignId('color_id');
            $table->string('color')->nullable();
        });
    }
};