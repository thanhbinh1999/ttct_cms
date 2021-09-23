<?php

namespace Kuroneko\Rbac\Classes\Processors;

use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Rbac\Classes\DataProviders\Role\RoleDataProvider;
use Kuroneko\Rbac\Classes\Elastics\PermissionElasticSearch;
use Kuroneko\Rbac\Repositories\PermissionRepository;
use Kuroneko\User\Classes\DataProviders\User\UserDataProvider;

/**
 * Class PermissionProcessor
 * @package Kuroneko\Rbac\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class PermissionProcessor extends BaseProcessorAbstracts
{
    /**
     * @var PermissionRepository
     */
    private $permissionRepository;

    /**
     * @var PermissionElasticSearch
     */
    private $permissionElastic;

    /**
     * @var RoleDataProvider
     */
    private $roleDataProvider;

    /**
     * @var UserDataProvider
     */
    private $userDataProvider;

    /**
     * PermissionProcessor constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->permissionRepository = app()->make(PermissionRepository::class);
        $this->permissionElastic = app()->make(PermissionElasticSearch::class);
        $this->roleDataProvider = app()->make(RoleDataProvider::class);
        $this->userDataProvider = app()->make(UserDataProvider::class);
    }

    /**
     * @param $data
     * @return mixed|void
     */
    public function insertDB($data)
    {
        return $this->permissionRepository->insert($data);
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateDB($id, $data)
    {
        return $this->permissionRepository->update($id, $data);
    }

    /**
     * @param $id
     * @return bool
     */
    public function buildElasticPermission($id)
    {
        return $this->buildElasticOnePermission($id);
    }

    /**
     *
     */
    public function rebuildElasticAllPermission()
    {
        $this->printMessage("Being build all permissions to elastic");
        $permissions = $this->permissionRepository->all();
        $this->permissionElastic->deleteAll();
        foreach ($permissions as $permission) {
            $this->buildElasticPermission($permission->id);
        }
    }

    /**
     * @param $id
     * @return bool
     */
    private function buildElasticOnePermission($id)
    {
        try {
            $permission = $this->permissionRepository->findById($id);
            if (!empty($permission)) {
                $roles = \DB::table('role_has_permissions')
                    ->leftJoin('roles', 'roles.id', '=', 'role_has_permissions.role_id')
                    ->where('permission_id', $permission->id)
                    ->select(['roles.id as role_id', 'roles.name', 'roles.slug', 'roles.guard_name', 'roles.status', 'roles.description', 'roles.created_at', 'roles.updated_at'])
                    ->get()->unique();
                $models = \DB::table('model_has_permissions')->leftJoin('users', 'users.id', '=', 'model_has_permissions.model_id')->where('permission_id', $permission->id)->get()->unique();
                $data = [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'slug' => $permission->slug,
                    'guard_name' => $permission->guard_name,
                    'status' => $permission->status,
                    'description' => $permission->description,
                    'created_at' => strtotime($permission->created_at),
                    'updated_at' => strtotime($permission->updated_at),
                    'roles' => $roles->map(function ($role) {
                        return [
                            'id' => $role->role_id,
                            'name' => $role->name,
                            'slug' => $role->slug,
                            'guard_name' => $role->guard_name,
                            'status' => $role->status,
                            'description' => $role->description,
                            'created_at' => strtotime($role->created_at),
                            'updated_at' => strtotime($role->updated_at),
                        ];
                    }),
                    'models' => $models->map(function ($model) {
                        return [
                            'id' => $model->id,
                            'username' => $model->username,
                            'first_name' => $model->first_name,
                            'last_name' => $model->last_name
                        ];
                    })
                ];
                if (!empty($this->permissionElastic->findOne($id))) {
                    $this->permissionElastic->find()->where(['id', '=', $id])->delete();
                }
                $build = $this->permissionElastic->insert($data);
                if ($build) {
                    $this->printMessage("Build elastic permission {$id} successful");
                } else {
                    $this->printMessage("Build elastic permission {$id} failed");
                }
                return $build;
            } else {
                $this->printError("Cannot find permission with id {$id} in database");
                return false;
            }
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return false;
        }
    }
}
