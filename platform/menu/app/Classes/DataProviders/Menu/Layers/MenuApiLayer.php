<?php

namespace Kuroneko\Menu\Classes\DataProviders\Menu\Layers;

use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Menu\Classes\DataProviders\Menu\Interfaces\MenuLayerInterface;

/**
 * Class MenuApiLayer
 * @package Kuroneko\Menu\Classes\DataProviders\Menu\Layers
 * @author Giang Nguyen - 黒猫
 */
class MenuApiLayer extends BaseLayerAbstract implements MenuLayerInterface
{
    use CurlTrait;

    /**
     * MenuApiLayer constructor.
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
    public function getListMenu($page, $perPage, $search = [])
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


            if (!empty($search['sort'])) {
                $data['sort'] = $search['sort'];
            }

            if (!empty($search['key'])) {
                $data['query']['search-key'] = $search['key'];
            }

            if (!empty($search['status'])) {
                $data['query']['status'] = $search['status'];
            }

            $url = $this->getBaseUrl() . '/be/menus/datatable';

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
    public function getEdit($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/menus/edit/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }
}
