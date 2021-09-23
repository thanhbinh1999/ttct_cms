<?php

namespace Kuroneko\Rbac\Repositories;

use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\Rbac\Models\Permission;

class PermissionRepository extends EloquentRepositoryAbstract
{
    public function __construct(Permission $model)
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
}
