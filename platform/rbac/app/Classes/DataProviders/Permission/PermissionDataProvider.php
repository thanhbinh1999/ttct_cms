<?php

namespace Kuroneko\Rbac\Classes\DataProviders\Permission;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Rbac\Classes\DataProviders\Permission\Interfaces\PermissionDataProviderInterface;

/**
 * Class PermissionDataProvider
 * @package Kuroneko\Rbac\Classes\DataProviders\Permission
 * @author Giang Nguyen - 黒猫
 */
class PermissionDataProvider extends BaseDataProviderAbstract implements PermissionDataProviderInterface
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
            'db' => 'Kuroneko\Rbac\Classes\DataProviders\Permission\Layers\PermissionDBLayer',
            'elastic' => 'Kuroneko\Rbac\Classes\DataProviders\Permission\Layers\PermissionElasticLayer'
        ];
    }

    /**
     * @return array
     */
    public function except(): array
    {
        return [
            'findById' => 'db',
            'all' => 'db',
            'allBy' => 'db',
            'firstBy' => 'db',
            'findManyById' => 'db'
        ];
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
    public function getListPermissions($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function findManyById(array $ids, $with = [], $select = ['*'], $orderBy = null)
    {

        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
