<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \Kuroneko\Core\Supports\Helper::autoLoad(platform_path('user/database/seed'));
        \Kuroneko\Core\Supports\Helper::autoLoad(platform_path('ttct/database/seeds'));
        \Kuroneko\Core\Supports\Helper::autoLoad(platform_path('menu/database/seeds'));
        \Kuroneko\Core\Supports\Helper::autoLoad(platform_path('rbac/database/seeds'));
        $this->call(UserTableSeeder::class);
        $this->call(RoleTableSeeder::class);
        $this->call(PermissionTableSeeder::class);
        $this->call(PivotRbacTableSeeder::class);
    }
}
