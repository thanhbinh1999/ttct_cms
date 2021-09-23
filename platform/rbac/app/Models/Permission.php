<?php

namespace Kuroneko\Rbac\Models;

class Permission extends \Spatie\Permission\Models\Permission
{
    protected $fillable = [
        'name',
        'slug',
        'status',
        'description',
        'guard_name',
    ];
}
