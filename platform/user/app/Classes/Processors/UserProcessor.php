<?php

namespace Kuroneko\User\Classes\Processors;

use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\User\Classes\Elastics\UserElastic;
use Kuroneko\User\Repositories\UserRepository;

/**
 * Class UserProcessor
 * @package Kuroneko\User\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class UserProcessor extends BaseProcessorAbstracts
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    private $userElastic;

    /**
     * UserProcessor constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->userRepository = app()->make(UserRepository::class);
        $this->userElastic = app()->make(UserElastic::class);
    }

    /**
     * @param $data
     * @return mixed|void
     */
    public function insertDB($data)
    {
        return $this->userRepository->insert($data);
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateDB($id, $data)
    {
        return $this->userRepository->update($id, $data);
    }

    /**
     *
     */
    public function reBuildElasticAllUser()
    {
        $users = $this->userRepository->all();
        $this->userElastic->deleteAll();
        foreach ($users as $user) {
            $this->buildElasticUser($user->id);
        }
    }

    /**
     * @param $id
     * @return bool
     */
    public function buildElasticUser($id)
    {
        return $this->buildElasticOneUser($id);
    }

    /**
     * @param $id
     * @return bool
     */
    private function buildElasticOneUser($id)
    {
        try {
            $user = $this->userRepository->findById($id);
            if (!empty($user)) {
                $role = $user->roles->first();
                $permissions = $user->getAllPermissions();

                $data = [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'dob' => $user->dob,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'gender' => $user->gender,
                    'avatar' => $user->avatar,
                    'avatar_base_url' => $user->avatar_base_url,
                    'login_at' => !empty($user->login_at) ? strtotime($user->login_at) : null,
                    'role' => [
                        'id' => $role->id,
                        'name' => $role->name,
                        'slug' => $role->slug,
                        'guard_name' => $role->guard_name,
                        'status' => $role->status,
                        'description' => $role->description,
                        'created_at' => strtotime($role->created_at),
                        'updated_at' => strtotime($role->updated_at)
                    ],
                    'permissions' => collect($permissions)->map(function ($permission) {
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
                    })
                ];

                if (!empty($this->userElastic->findOne($id))) {
                    $this->userElastic->find()->where(['id', '=', $id])->delete();
                }

                $build = $this->userElastic->insert($data);

                if ($build) {
                    $this->printMessage('Build user ' . $id . ' to elastic successful');
                } else {
                    $this->printMessage('Build user ' . $id . ' to elastic failed');
                }
                return $build;
            }

        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return false;
        }
    }
}
