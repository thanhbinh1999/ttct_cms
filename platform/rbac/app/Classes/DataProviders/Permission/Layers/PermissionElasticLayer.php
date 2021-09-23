<?php


namespace Kuroneko\Rbac\Classes\DataProviders\Permission\Layers;


use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Rbac\Classes\DataProviders\Permission\Interfaces\PermissionLayerInterface;
use Kuroneko\Rbac\Classes\Elastics\PermissionElasticSearch;

/**
 * Class PermissionElasticLayer
 * @package Kuroneko\Rbac\Classes\DataProviders\Permission\Layers
 * @author Giang Nguyen - 黒猫
 */
class PermissionElasticLayer extends BaseLayerAbstract implements PermissionLayerInterface
{

    /**
     * @var PermissionElasticSearch
     */
    private $permissionElastic;

    /**
     * PermissionElasticLayer constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->permissionElastic = app()->make(PermissionElasticSearch::class);
    }

    public function getListPermissions($page, $perPage, $search = [])
    {
        try {
            $this->permissionElastic->find()
                ->offset(resolve_offset($page, $perPage))
                ->limit($perPage);

            if (!empty($search['sort'])) {
                $this->permissionElastic->orderBy([$search['sort']['field'] => $search['sort']['type']]);
            } else {
                $this->permissionElastic->orderBy(['created_at' => 'desc']);
            }

            if (!empty($search['key'])) {
                $this->permissionElastic->andWhere(['slug', 'like', \Str::slug($search['key'])]);
            }

            $count = $this->permissionElastic->count(false);
            $data = $this->permissionElastic->search();
            return [
                'current_page' => intval($page),
                'per_page' => intval($perPage),
                'total_items' => $count,
                'total_pages' => ceil($count / intval($perPage)),
                'data' => !empty($data['data']) ? $data['data'] : []
            ];
        } catch (\Exception $exception) {
            return [
                'current_page' => $page,
                'per_page' => $perPage,
                'total_items' => 0,
                'total_pages' => 0,
                'data' => []
            ];
        }
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
    public function findManyById(array $ids, $with = [], $select = ['*'], $orderBy = null)
    {
        // TODO: Implement findManyById() method.
    }
}
