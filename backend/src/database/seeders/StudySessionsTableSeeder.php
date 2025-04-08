<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudySessionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $param = [
            'user_id' => 1,
            'category_id' => 1,
            'content' => 'testA',
            'start_time' => Carbon::now(),
            'finish_time' => Carbon::now(),
        ];
        DB::table('study_sessions')->insert($param);

        $param = [
            'user_id' => 1,
            'category_id' => 2,
            'content' => 'testB',
            'start_time' => Carbon::now(),
        ];
        DB::table('study_sessions')->insert($param);
    }
}
