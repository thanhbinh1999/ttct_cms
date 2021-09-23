<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('first_name')->nullable();
            $table->string('last_name');
            $table->date('dob')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->tinyInteger('gender')->nullable();
            $table->text('avatar')->nullable();
            $table->text('avatar_base_url')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('login_at')->nullable();
            $table->string('login_token')->nullable();
            $table->string('token_expire_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
