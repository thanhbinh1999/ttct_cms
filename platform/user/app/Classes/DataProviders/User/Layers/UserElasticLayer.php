<?php


namespace Kuroneko\User\Classes\DataProviders\User\Layers;


use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\User\Classes\Elastics\UserElastic;
use Kuroneko\User\Classes\DataProviders\User\Interfaces\UserLayerInterface;

/**
 * Class UserElasticLayer
 * @package Kuroneko\User\Classes\DataProviders\User\Layers
 * @author Giang Nguyen - 黒猫
 */
class UserElasticLayer extends BaseLayerAbstract implements UserLayerInterface
{

    private $userElastic;

    /**
     * UserElasticLayer constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->userElastic = app()->make(UserElastic::class);
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array
     */
    public function getListUser($page, $perPage, $search = [])
    {
        try {
            $this->userElastic->find()
                ->offset(resolve_offset($page, $perPage))
                ->limit($perPage);


            if (!empty($search['role'])) {
                $this->userElastic->andWhere(['role.id', '=', $search['role']]);
            }

            if (!empty($search['permission'])) {
                $this->userElastic->andWhere(['permissions.id', '=', $search['permission']]);
            }

            if (!empty($search['username'])) {
                $this->userElastic->andWhere(['username', '=', $search['username']]);
            }

            if (!empty($search['not_in_role'])) {
                $this->userElastic->andWhere(['role.id', 'not_in', $search['not_in_role']]);
            }


            $count = $this->userElastic->count(false);
            $data = $this->userElastic->search();

            return [
                'current_page' => intval($page),
                'per_page' => intval($perPage),
                'total_items' => $count,
                'total_pages' => ceil($count / intval($perPage)),
                'data' => !empty($data['data']) ? $data['data'] : []
            ];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [
                'current_page' => intval($page),
                'per_page' => intval($perPage),
                'total_items' => 0,
                'total_pages' => 0,
                'data' => []
            ];
        }
    }

    /**
     * @inheritDoc
     */
    public function all(array $with = [], array $select = ['*'], $orderBy = null)
    {
        // TODO: Implement all() method.
    }

    /**
     * @inheritDoc
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*'])
    {
        // TODO: Implement firstBy() method.
    }

    /**
     * @inheritDoc
     */
    public function findById($id, array $with = [], array $select = ['*'])
    {
        // TODO: Implement findById() method.
    }

    /**
     * @inheritDoc
     */
    public function getUsersByRole($name)
    {
        // TODO: Implement getUsersByRole() method.
    }

    /**
     * @inheritDoc
     */
    public function getUsersByRoles($names = [])
    {
        // TODO: Implement getUsersByRoles() method.
    }

    /**
     * @inheritDoc
     */
    public function getUserByPermissions($permissions = [])
    {
        // TODO: Implement getUserByPermissions() method.
    }
}
