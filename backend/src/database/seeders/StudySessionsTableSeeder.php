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
        $param =[
        [
            'user_id' => 1,
            'category_id' => 1,
            'content' => 'testA-1',
            'start_time' => '2025-04-1 10:00:00',
            'finish_time' => '2025-04-1 11:00:00',
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'content' => 'testB-1',
            'start_time' => '2025-04-2 11:00:00',
            'finish_time' => '2025-04-2 12:00:00',
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'content' => 'testC-1',
            'start_time' => '2025-04-3 11:00:00',
            'finish_time' => '2025-04-3 12:00:00',
        ],
        [
            'user_id' => 1,
            'category_id' => 4,
            'content' => 'testD-1',
            'start_time' => '2025-04-2 12:00:00',
            'finish_time' => '2025-04-2 12:30:00',
        ],
        [
            'user_id' => 1,
            'category_id' => 1,
            'content' => 'testA-2',
            'start_time' => '2025-04-4 11:00:00',
            'finish_time' => '2025-04-4 14:53:47',
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'content' => 'testB-2',
            'start_time' => '2025-04-5 11:00:00',
            'finish_time' => '2025-04-5 16:53:47',
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'content' => 'testC-2',
            'start_time' => '2025-04-6 9:00:00',
            'finish_time' => '2025-04-6 16:53:47',
        ],
        [
            'user_id' => 1,
            'category_id' => 4,
            'content' => 'testD-2',
            'start_time' => '2025-04-10 11:00:00',
            'finish_time' => '2025-04-10 16:53:47',
        ],
        [
            'user_id' => 1,
            'category_id' => 1,
            'content' => 'testA-3',
            'start_time' => '2025-04-11 11:00:00',
            'finish_time' => '2025-04-11 16:53:47',
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'content' => 'testB-3',
            'start_time' => '2025-04-12 11:00:00',
            'finish_time' => '2025-04-12 16:53:47',
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'content' => 'testC-3',
            'start_time' => '2025-04-13 11:00:00',
            'finish_time' => '2025-04-13 16:53:47',
        ],
    ];
        DB::table('study_sessions')->insert($param);

        $param =[
            'user_id' => 1,
            'category_id' => 4,
            'content' => 'testD-3',
            'start_time' => Carbon::now(),
        ];
        DB::table('study_sessions')->insert($param);
    }
}
