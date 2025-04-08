<?php

namespace Database\Seeders;

use App\Models\StudySession;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(StudySessionsTableSeeder::class);
        $this->call(RestsTableSeeder::class);
    }
}
