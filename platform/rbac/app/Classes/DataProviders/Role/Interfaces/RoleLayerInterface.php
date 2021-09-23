<?php


namespace Kuroneko\Rbac\Classes\DataProviders\Role\Interfaces;

/**
 * Interface RoleLayerInterface
 * @package Kuroneko\Rbac\Classes\DataProviders\Role\Interfaces
 * @author Giang Nguyen - 黒猫
 */
interface RoleLayerInterface
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
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function findById($id, array $with = [], array $select = ['*']);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListRoles($page, $perPage, $search = []);
}
