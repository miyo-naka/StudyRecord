<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $param = [[
            'category_name' => 'Programming',
        ], [
            'category_name' => 'Data Analyse',
        ], [
            'category_name' => 'English',
        ], [
            'category_name' => 'Other',
        ]];
        DB::table('categories')->insert($param);

    }
}
