<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        $userRepository = app()->make(\Kuroneko\User\Repositories\UserRepository::class);
        $users = array(
            array('id' => '1', 'username' => 'giangnn', 'email' => 'giangnguyen.neko.130@gmail.com', 'first_name' => 'Giang', 'last_name' => 'Nguyễn', 'dob' => '1997-04-15', 'phone' => '0971381894', 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => '2020-03-09 17:43:07', 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$tR0ZnO1B4H4zdOdHqO9dgO5vkHrXnlBPCzwt8uKN6hXOX4NfN0z8K', 'remember_token' => NULL, 'created_at' => '2020-02-28 13:18:39', 'updated_at' => '2020-03-09 17:43:07'),
            array('id' => '2', 'username' => 'qhoi_tkts', 'email' => 'quochoi@mail.com', 'first_name' => 'Quốc', 'last_name' => 'Hội', 'dob' => NULL, 'phone' => NULL, 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => '2020-03-01 19:12:52', 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$ML28uonjR.yWCr6cyCOYYevRYtMChQ7B1MsmtBzSjzlbVnxQP7pdi', 'remember_token' => 'gnPHZqgAClF0bo47ejQ5jjlXzqRm4NyDMHA0kDTrGmtUnD8llyMRz3Zeemxj', 'created_at' => '2020-02-28 13:23:30', 'updated_at' => '2020-03-01 19:12:52'),
            array('id' => '3', 'username' => 'qhoi_pv', 'email' => 'quoc-hoi-pv@gmail.com', 'first_name' => 'Quốc', 'last_name' => 'Hội', 'dob' => NULL, 'phone' => NULL, 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => NULL, 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$/RekgoGcxcKzN4or/QB/DeXZwfGY17fxuhpqVV2O/EtnaP.qWeCW2', 'remember_token' => NULL, 'created_at' => '2020-02-28 13:24:21', 'updated_at' => '2020-02-28 13:24:21'),
            array('id' => '4', 'username' => 'giang_tkts', 'email' => 'giang-tkts@gmail.com', 'first_name' => 'Giang', 'last_name' => 'Nguyễn', 'dob' => NULL, 'phone' => NULL, 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => '2020-03-10 12:59:48', 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$WoxRzbW8Z9QlM28G.r53gOwDEfrEgvj.eEB81OEzOnoImrdCez1qe', 'remember_token' => NULL, 'created_at' => '2020-02-28 16:32:37', 'updated_at' => '2020-03-10 12:59:48'),
            array('id' => '5', 'username' => 'ctien_tkts', 'email' => 'ctien-tkts@gmail.com', 'first_name' => NULL, 'last_name' => 'CTiến', 'dob' => '1970-01-01', 'phone' => NULL, 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => '2020-03-02 19:10:35', 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$DfOrrC/sl3MjgLQDBYNYTOD5WvQBc0wJTqgvbTPkhtyRr3avxOxF.', 'remember_token' => 'qiDl4gtiGyuy7pPtuaznUePDawhP3As1phzafTcbNu4dHuI4JaGihbtg87Go', 'created_at' => '2020-03-02 15:21:12', 'updated_at' => '2020-03-02 19:10:35'),
            array('id' => '6', 'username' => 'giang_pv', 'email' => 'giang-pv@gmail.com', 'first_name' => 'Giang', 'last_name' => 'PV', 'dob' => '1970-01-01', 'phone' => NULL, 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => '2020-03-09 19:07:36', 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$1/G1gr5JQRrJEoUh5tKvn.JgAsITIa/5LKQ/PmV4Zr4psa32/jNVS', 'remember_token' => NULL, 'created_at' => '2020-03-03 14:57:38', 'updated_at' => '2020-03-09 19:07:36'),
            array('id' => '7', 'username' => 'giang_btv', 'email' => 'giang-btv@gmail.com', 'first_name' => 'Giang', 'last_name' => 'BTV', 'dob' => NULL, 'phone' => NULL, 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => '2020-03-09 11:34:06', 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$p6U3w91Apl8UydMLluuKDekfbTgtlZpVlknOC65ljD8uZ63DqiAE2', 'remember_token' => NULL, 'created_at' => '2020-03-05 13:37:48', 'updated_at' => '2020-03-09 11:34:06'),
            array('id' => '9', 'username' => 'ctien_btv', 'email' => 'ctien-btv@gmail.com', 'first_name' => 'CTien', 'last_name' => 'BTV', 'dob' => NULL, 'phone' => NULL, 'address' => NULL, 'gender' => '1', 'avatar' => 'user-placeholder.png', 'avatar_base_url' => 'https://static.tuoitre.vn/ttct', 'email_verified_at' => NULL, 'login_at' => NULL, 'login_token' => NULL, 'token_expire_at' => NULL, 'password' => '$2y$10$9JLBRG5pb3rNMLgb9qmxheA/dwyrFpIuNjunbNRZEM/XDsd1FXIkW', 'remember_token' => NULL, 'created_at' => '2020-03-05 14:03:37', 'updated_at' => '2020-03-05 14:03:37')
        );

        foreach ($users as $user) {
            $user['password'] = Hash::make('password');
            $userRepository->insert($user);
        }
    }
}
