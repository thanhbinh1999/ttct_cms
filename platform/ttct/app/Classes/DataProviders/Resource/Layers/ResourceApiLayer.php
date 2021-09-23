<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Resource\Layers;

use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Resource\Interfaces\ResourceLayerInterface;

/**
 * Class ResourceApiLayer
 * @package Kuroneko\Ttct\Classes\DataProviders\Resource\Layers
 * @author Giang Nguyen - 黒猫
 */
class ResourceApiLayer extends BaseLayerAbstract implements ResourceLayerInterface
{
    use CurlTrait;

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
    public function getListResource($page, $perPage, $search = [])
    {
        try {
            $data = [
                'pagination' => [
                    'page' => $page,
                    'perpage' => $perPage
                ],
                'sort' => [],
                'query' => []
            ];

            if (!empty($search['sort'])) {
                $data['sort'] = $search['sort'];
            }

            if (!empty($search['key'])) {
                $data['query']['name'] = $search['key'];
            }

            if (!empty($search['status'])) {
                $data['query']['status'] = $search['status'];
            }

            if (!empty($search['type'])) {
                $data['query']['type'] = $search['type'];
            }

            if (!empty($search['upload_by'])) {
                $data['query']['upload_by'] = $search['upload_by'];
            }

            if (!empty($search['from'])) {
                $data['query']['from'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $data['query']['to'] = $search['to'];
            }

            $url = $this->getBaseUrl() . '/be/resources/datatable';
            return $this->execPost($url, $data)['res'];
        } catch (ClientException $exception) {
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

    public function getEdit($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/resources/edit/' . $id;
            return $this->execGet($url)['res'];
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [];
        }
    }
}
