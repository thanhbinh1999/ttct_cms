<?php

namespace Kuroneko\Rbac\Classes\DataProviders\Permission\Layers;

use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Rbac\Classes\DataProviders\Permission\Interfaces\PermissionLayerInterface;
use Kuroneko\Rbac\Repositories\PermissionRepository;

/**
 * Class PermissionDBLayer
 * @package Kuroneko\Rbac\Classes\DataProviders\Permission\Layers
 * @author Giang Nguyen - 黒猫
 */
class PermissionDBLayer extends BaseLayerAbstract implements PermissionLayerInterface
{
    /**
     * @var PermissionRepository
     */
    private $permissionRepository;

    /**
     * PermissionDBLayer constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->permissionRepository = app()->make(PermissionRepository::class);
    }

    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed|null
     */
    public function findById($id, array $with = [], array $select = ['*'])
    {
        return $this->permissionRepository->findById($id, $with, $select);
    }

    /**
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed\
     */
    public function all(array $with = [], array $select = ['*'], $orderBy = null)
    {
        return $this->permissionRepository->all($with, $select, $orderBy);
    }

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function allBy(array $conditions = [], array $with = [], array $select = ['*'], $orderBy = null)
    {
        return $this->permissionRepository->allBy($conditions, $with, $select, $orderBy);
    }

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*'])
    {
        return $this->permissionRepository->firstBy($conditions, $with, $select);
    }

    /**
     * @param array $ids
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function findManyById(array $ids, $with = [], $select = ['*'], $orderBy = null)
    {
        return $this->permissionRepository->findManyById($ids, $with, $select, $orderBy);
    }

    /**
     * @inheritDoc
     */
    public function getListPermissions($page, $perPage, $search = [])
    {
        // TODO: Implement getListPermissions() method.
    }
}
