<?php

namespace Kuroneko\Rbac\Models;

class Role extends \Spatie\Permission\Models\Role
{
    protected $fillable = [
        'name',
        'slug',
        'status',
        'description',
        'guard_name'
    ];
}
