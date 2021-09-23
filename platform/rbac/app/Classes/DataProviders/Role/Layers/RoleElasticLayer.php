<?php


namespace Kuroneko\Rbac\Classes\DataProviders\Role\Layer;


use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Rbac\Classes\DataProviders\Role\Interfaces\RoleLayerInterface;
use Kuroneko\Rbac\Classes\Elastics\RoleElasticSearch;

/**
 * Class RoleElasticLayer
 * @package Kuroneko\Rbac\Classes\DataProviders\Role\Layer
 * @author Giang Nguyen - 黒猫
 */
class RoleElasticLayer extends BaseLayerAbstract implements RoleLayerInterface
{
    /**
     * @var RoleElasticSearch
     */
    private $roleElastic;

    public function __construct()
    {
        $this->roleElastic = app()->make(RoleElasticSearch::class);
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListRoles($page, $perPage, $search = [])
    {
        try {
            $this->roleElastic->find()
                ->offset(resolve_offset($page, $perPage))
                ->limit($perPage);

            if (!empty($search['order'])) {
                $this->roleElastic->orderBy([$search['order']['field'] => $search['order']['type']]);
            } else {
                $this->roleElastic->orderBy(['created_at' => 'desc']);
            }

            if (!empty($search['status']) && $search['status'] != -1) {
                $this->roleElastic->andWhere(['status', '=', $search['status']]);
            }

            if (!empty($search['key'])) {
                $this->roleElastic->andWhere(['slug', 'like', \Str::slug($search['key'])]);
            }

            if (!empty($search['except'])) {
                $this->roleElastic->andWhere(['id', 'not_in', $search['except']]);
            }


            $count = $this->roleElastic->count(false);
            $data = $this->roleElastic->search();

            return [
                'current_page' => intval($page),
                'per_page' => intval($perPage),
                'total_items' => $count,
                'total_pages' => ceil($count / intval($perPage)),
                'data' => !empty($data['data']) ? $data['data'] : []
            ];
        } catch (\Exception $exception) {
            return [
                'current_page' => intval($page),
                'per_page' => intval($perPage),
                'total_items' => $count,
                'total_pages' => ceil($count / intval($perPage)),
                'data' => !empty($data['data']) ? $data['data'] : []
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
    public function allBy(array $conditions = [], array $with = [], array $select = ['*'], $orderBy = null)
    {
        // TODO: Implement allBy() method.
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
}
