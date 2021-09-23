<?php

namespace Kuroneko\User\Classes\DataProviders\User;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\User\Classes\DataProviders\User\Interfaces\UserDataProviderInterface;

/**
 * Class UserDataProvider
 * @package Kuroneko\User\Classes\DataProviders\User
 * @author Giang Nguyen - 黒猫
 */
class UserDataProvider extends BaseDataProviderAbstract implements UserDataProviderInterface
{

    /**
     * @inheritDoc
     */
    public function method(): string
    {
        return 'db';
    }

    /**
     * @inheritDoc
     */
    public function mapMethod(): array
    {
        return [
            'db' => 'Kuroneko\User\Classes\DataProviders\User\Layers\UserDBLayer',
            'elastic' => 'Kuroneko\User\Classes\DataProviders\User\Layers\UserElasticLayer'
        ];
    }

    public function except(): array
    {
        return [
            'getListUser' => 'elastic'
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
    public function getUsersByRole($name)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }


    /**
     * @inheritDoc
     */
    public function getListUser($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getUsersByRoles($names = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getUserByPermissions($permissions = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
