<?php

namespace Kuroneko\Rbac\Classes\DataProviders\Role\Layer;

use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Rbac\Classes\DataProviders\Role\Interfaces\RoleLayerInterface;
use Kuroneko\Rbac\Repositories\RoleRepository;

/**
 * Class RoleDBLayer
 * @package Kuroneko\Rbac\Classes\DataProviders\Role\Layer
 * @author Giang Nguyen - 黒猫
 */
class RoleDBLayer extends BaseLayerAbstract implements RoleLayerInterface
{
    /**
     * @var RoleRepository
     */
    private $roleRepository;

    /**
     * RoleDBLayer constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->roleRepository = app()->make(RoleRepository::class);
    }

    /**
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function all(array $with = [], array $select = ['*'], $orderBy = null)
    {
        return $this->roleRepository->all($with, $select, $orderBy);
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
        return $this->roleRepository->allBy($conditions, $with, $select, $orderBy);
    }

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*'])
    {
        return $this->roleRepository->firstBy($conditions, $with, $select);
    }

    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed|null
     */
    public function findById($id, array $with = [], array $select = ['*'])
    {
        return $this->roleRepository->findById($id, $with, $select);
    }

    /**
     * @inheritDoc
     */
    public function getListRoles($page, $perPage, $search = [])
    {
        // TODO: Implement getListRoles() method.
    }
}
