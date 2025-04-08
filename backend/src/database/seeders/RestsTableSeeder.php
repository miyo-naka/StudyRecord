<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $param = [
            'study_session_id' => 1,
            'rest_start_time' => Carbon::now(),
            'rest_finish_time' => Carbon::now(),
        ];
        DB::table('rests')->insert($param);

        $param = [
            'study_session_id' => 1,
            'rest_start_time' => Carbon::now(),
        ];
        DB::table('rests')->insert($param);

        $param = [
            'study_session_id' => 2,
            'rest_start_time' => Carbon::now(),
            'rest_finish_time' => Carbon::now(),
        ];
        DB::table('rests')->insert($param);
    }
}
