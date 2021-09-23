<?php


namespace Kuroneko\Rbac\Repositories;

use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\Rbac\Models\Role;
use Kuroneko\User\Models\User;

class RoleRepository extends EloquentRepositoryAbstract
{
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    /**
     * @param array $attribute
     * @return mixed|void
     */
    public function insert(array $attribute)
    {
        $class = get_class($this->getModel());
        return $class::create($attribute);
    }

    /**
     * @param Role $role
     * @return mixed
     */
    public function getAllUserOfRole(Role $role)
    {
        return User::whereHas("roles", function ($query) use ($role) {
            $query->where("name", $role->name);
        })->get();
    }
}
