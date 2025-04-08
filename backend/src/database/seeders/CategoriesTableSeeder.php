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
        $param = [
            'category_name' => 'Programming',
        ];
        DB::table('categories')->insert($param);

        $param = [
            'category_name' => 'Data Analyse',
        ];
        DB::table('categories')->insert($param);

        $param = [
            'category_name' => 'English',
        ];
        DB::table('categories')->insert($param);

        $param = [
            'category_name' => 'Other',
        ];
        DB::table('categories')->insert($param);

    }
}
