<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Tag\Layers;

use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Tag\Interfaces\TagLayerInterface;

/**
 * Class TagApiLayer
 * @package Kuroneko\Ttct\Classes\DataProviders\Tag\Layers
 * @author Giang Nguyen - 黒猫
 */
class TagApiLayer extends BaseLayerAbstract implements TagLayerInterface
{
    use CurlTrait;

    /**
     * TagApiLayer constructor.
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
    public function getListTag($page, $perPage, $search = [])
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

            if (!empty($search['type'])) {
                $data['query']['type'] = $search['type'];
            }

            if (!empty($search['status'])) {
                $data['query']['status'] = $search['status'];
            }

            $url = $this->getBaseUrl() . '/be/tags/datatable';

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
            $url = $this->getBaseUrl() . '/be/tags/edit/' . $id;
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
    public function selectTag($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/select-tags';
            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }

}
