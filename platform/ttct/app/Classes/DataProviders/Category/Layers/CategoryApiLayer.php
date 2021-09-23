<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Category\Layers;

use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Category\Interfaces\CategoryLayerInterface;

/**
 * Class CategoryApiLayer
 * @package Kuroneko\Ttct\Classes\DataProviders\Category\Layers
 * @author Giang Nguyen - 黒猫
 */
class CategoryApiLayer extends BaseLayerAbstract implements CategoryLayerInterface
{
    use CurlTrait;

    /**
     * CategoryApiLayer constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListCategories($page, $perPage, $search = [])
    {
        try {
            $data = [
                'pagination' => [
                    'page' => $page,
                    'perpage' => $perPage
                ],
                'query' => [],
                'sort' => []
            ];

            if (!empty($search['type'])) {
                $data['query']['type'] = $search['type'];
            }

            if (!empty($search['key'])) {
                $data['query']['search-key'] = $search['key'];
            }

            if (!empty($search['sort'])) {
                $data['sort'] = $search['sort'];
            }

            if (!empty($search['status'])) {
                $data['query']['status'] = $search['status'];
            }

            $url = $this->getBaseUrl() . '/be/categories/datatable';
            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [
                'meta' => [
                    'page' => $page,
                    'pages' => 4,
                    'perpage' => $perPage,
                    'total' => 0
                ],
                'data' => []
            ];
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getForEdit($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/edit/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getDetail($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/get-detail/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $data
     * @return array|mixed
     */
    public function selectCategory($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/select-categories';
            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }
}
