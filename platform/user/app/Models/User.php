<?php

namespace Kuroneko\User\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'first_name',
        'last_name',
        'dob',
        'phone',
        'address',
        'gender',
        'avatar',
        'avatar_base_url',
        'email_verified_at',
        'password',
        'login_at',
        'login_token',
        'token_expire_at',
        'remember_token',
        'login_at'
    ];


    protected $hidden = [
//        'login_at',
        'login_token',
        'token_expire_at',
        'password',
        'remember_token'
    ];
}
