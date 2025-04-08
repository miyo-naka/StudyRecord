<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $param = [
            'name' => 'test1',
            'email' => 'test1@email.com',
            'password' => Hash::make('test1_pass'),
            'email_verified_at' => Carbon::now(),
        ];
        DB::table('users')->insert($param);
    }
}
