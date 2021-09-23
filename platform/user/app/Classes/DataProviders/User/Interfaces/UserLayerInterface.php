<?php
namespace Kuroneko\User\Classes\DataProviders\User\Interfaces;

/**
 * Interface UserLayerInterface
 * @package Kuroneko\User\Classes\DataProviders\User\Interfaces
 */
interface UserLayerInterface
{
    /**
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function all(array $with = [], array $select = ['*'], $orderBy = null);

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*']);

    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function findById($id, array $with = [], array $select = ['*']);

    /**
     * @param $name
     * @return mixed
     */
    public function getUsersByRole($name);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListUser($page, $perPage, $search = []);

    /**
     * @param array $names
     * @return mixed
     */
    public function getUsersByRoles($names = []);

    /**
     * @param array $permissions
     * @return mixed
     */
    public function getUserByPermissions($permissions = []);
}
