<?php


namespace Kuroneko\Rbac\Classes\DataProviders\Permission\Interfaces;

/**
 * Interface PermissionLayerInterface
 * @package Kuroneko\Rbac\Classes\DataProviders\Permission\Interfaces
 * @author Giang Nguyen - 黒猫
 */
interface PermissionLayerInterface
{
    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function findById($id, array $with = [], array $select = ['*']);

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
     * @param null $orderBy
     * @return mixed
     */
    public function allBy(array $conditions = [], array $with = [], array $select = ['*'], $orderBy = null);

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*']);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListPermissions($page, $perPage, $search = []);

    /**
     * @param array $ids
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function findManyById(array $ids, $with = [], $select = ['*'], $orderBy = null);
}
