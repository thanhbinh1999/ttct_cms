<?php

namespace Kuroneko\User\Classes\DataProviders\User\Layers;

use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\User\Classes\DataProviders\User\Interfaces\UserLayerInterface;
use Kuroneko\User\Repositories\UserRepository;

/**
 * Class UserDBLayer
 * @package Kuroneko\User\Classes\DataProviders\User\Layers
 * @author Giang Nguyen - 黒猫
 */
class UserDBLayer extends BaseLayerAbstract implements UserLayerInterface
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * UserDBLayer constructor.
     */
    public function __construct()
    {
        $this->userRepository = app()->make(UserRepository::class);
    }

    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed|null
     */
    public function findById($id, array $with = [], array $select = ['*'])
    {
        return $this->userRepository->findById($id, $with, $select);
    }

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*'])
    {
        return $this->userRepository->firstBy($conditions, $with, $select);
    }

    /**
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function all(array $with = [], array $select = ['*'], $orderBy = null)
    {
        return $this->userRepository->all($with, $select, $orderBy);
    }

    /**
     * @param $name
     * @return mixed
     */
    public function getUsersByRole($name)
    {
        $class = get_class($this->userRepository->getModel());
        return $class::whereHas('roles', function ($query) use ($name) {
            $query->where('name', $name);
        })->get();
    }

    /**
     * @param array $names
     * @return array
     */
    public function getUsersByRoles($names = [])
    {
        if (empty($names)) return [];
        $class = get_class($this->userRepository->getModel());
        return $class::whereHas('roles', function ($query) use ($names) {
            $query->where('name', $names);
        })->get();
    }

    /**
     * @param array $permissions
     * @return array
     */
    public function getUserByPermissions($permissions = [])
    {
        if (empty($permissions)) return [];

        $class = get_class($this->userRepository->getModel());
        //get role of permission;
        //if user has role => ok
        //else check on model_has_permission

        return $class::whereHas('permissions', function ($query) use ($permissions) {
            return $query->whereIn('permissions.name', $permissions);
        })->get();
    }

    /**
     * @inheritDoc
     */
    public function getListUser($page, $perPage, $search = [])
    {
        // TODO: Implement getListUser() method.
    }
}
