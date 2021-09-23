<?php


namespace Kuroneko\Rbac\Classes\Processors;


use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Rbac\Classes\Elastics\RoleElasticSearch;
use Kuroneko\Rbac\Repositories\RoleRepository;

/**
 * Class RoleProcessor
 * @package Kuroneko\Rbac\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class RoleProcessor extends BaseProcessorAbstracts
{
    /**
     * @var RoleRepository
     */
    private $roleRepository;

    /**
     * @var RoleElasticSearch
     */
    private $roleElastic;

    /**
     * RoleProcessor constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->roleRepository = app()->make(RoleRepository::class);
        $this->roleElastic = app()->make(RoleElasticSearch::class);
    }

    /**
     * @param $data
     * @return mixed|void
     */
    public function insertDB($data)
    {
        return $this->roleRepository->insert($data);
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateDB($id, $data)
    {
        return $this->roleRepository->update($id, $data);
    }

    /**
     * @param $id
     * @return bool
     */
    public function buildElasticRole($id)
    {
        return $this->buildElasticOneRole($id);
    }

    /**
     *
     */
    public function buildElasticAllRoles()
    {
        $this->printMessage("Being build all role");
        $roles = $this->roleRepository->all();
        $this->roleElastic->deleteAll();
        foreach ($roles as $role) {
            $this->buildElasticRole($role->id);
        }
    }

    /**
     * @param $id
     * @return bool
     */
    private function buildElasticOneRole($id)
    {
        try {
            $role = $this->roleRepository->findById($id);
            if (!empty($role)) {
                $permissions = $role->permissions()->get();
                $user = $this->roleRepository->getAllUserOfRole($role);

                $data = [
                    'id' => $role->id,
                    'name' => $role->name,
                    'slug' => $role->slug,
                    'guard_name' => $role->guard_name,
                    'status' => $role->status,
                    'description' => $role->description,
                    'created_at' => strtotime($role->created_at),
                    'updated_at' => strtotime($role->updated_at),
                    'permissions' => $permissions->map(function ($permission) {
                        return [
                            'id' => $permission->id,
                            'name' => $permission->name,
                            'slug' => $permission->slug,
                            'guard_name' => $permission->guard_name,
                            'status' => $permission->status,
                            'description' => $permission->description,
                            'created_at' => strtotime($permission->created_at),
                            'updated_at' => strtotime($permission->updated_at)
                        ];
                    }),
                    'models' => $user->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'username' => $user->username,
                            'email' => $user->email,
                            'first_name' => $user->first_name,
                            'last_name' => $user->last_name,
                            'dob' => $user->dob,
                            'phone' => $user->phone,
                            'address' => $user->address,
                            'gender' => $user->gender,
                            'avatar' => $user->avatar_base_url . '/' . $user->avatar
                        ];
                    })
                ];

                //delete old
                if (!empty($this->roleElastic->findOne($id))) {
                    $this->roleElastic->find()->where(['id', '=', $id])->delete();
                }

                $build = $this->roleElastic->insert($data);

                if ($build) {
                    $this->printMessage("Build elastic role {$id} successful");
                } else {
                    $this->printError("Build elastic role {$id} failed");
                }
                return $build;

            } else {
                $this->printError("Cannot find role {$id} in database");
                return false;
            }
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return false;
        }
    }
}
