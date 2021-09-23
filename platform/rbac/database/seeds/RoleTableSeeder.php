<?php


class RoleTableSeeder extends \Illuminate\Database\Seeder
{
    public function run()
    {
        $roleRepository = app()->make(\Kuroneko\Rbac\Repositories\RoleRepository::class);

        $roles = array(
            array('id' => '1', 'name' => 'adminítrator', 'slug' => 'adminitrator', 'description' => 'adminítrator', 'status' => '10', 'guard_name' => 'web', 'created_at' => '2020-02-20 16:52:07', 'updated_at' => '2020-02-22 21:21:02'),
            array('id' => '2', 'name' => 'pv', 'slug' => 'pv', 'description' => 'Phóng viên', 'status' => '10', 'guard_name' => 'web', 'created_at' => '2020-02-21 17:39:42', 'updated_at' => '2020-02-22 21:20:07'),
            array('id' => '3', 'name' => 'btv', 'slug' => 'btv', 'description' => 'Biên tập viên', 'status' => '10', 'guard_name' => 'web', 'created_at' => '2020-02-22 21:20:21', 'updated_at' => '2020-02-22 21:20:21'),
            array('id' => '4', 'name' => 'tkts', 'slug' => 'tkts', 'description' => 'Thư ký tòa soạn', 'status' => '10', 'guard_name' => 'web', 'created_at' => '2020-02-22 21:20:42', 'updated_at' => '2020-02-22 21:20:42')
        );

        foreach ($roles as $role) {
            $roleRepository->insert($role);
        }
    }
}
