<?php

namespace Kuroneko\Rbac\Classes\DataProviders\Role;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Rbac\Classes\DataProviders\Role\Interfaces\RoleDataProviderInterface;

/**
 * Class RoleDataProvider
 * @package Kuroneko\Rbac\Classes\DataProviders\Role
 * @author Giang Nguyen - 黒猫
 */
class RoleDataProvider extends BaseDataProviderAbstract implements RoleDataProviderInterface
{

    /**
     * @inheritDoc
     */
    public function method(): string
    {
        return 'elastic';
    }

    /**
     * @inheritDoc
     */
    public function mapMethod(): array
    {
        return [
            'db' => 'Kuroneko\Rbac\Classes\DataProviders\Role\Layer\RoleDBLayer',
            'elastic' => 'Kuroneko\Rbac\Classes\DataProviders\Role\Layer\RoleElasticLayer'
        ];
    }

    public function except(): array
    {
        return [
            'all' => 'db',
            'allBy' => 'db',
            'firstBy' => 'db',
            'findById' => 'db'
        ];
    }

    /**
     * @inheritDoc
     */
    public function all(array $with = [], array $select = ['*'], $orderBy = null)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function allBy(array $conditions = [], array $with = [], array $select = ['*'], $orderBy = null)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*'])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function findById($id, array $with = [], array $select = ['*'])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getListRoles($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
