<?php

namespace Kuroneko\Comment\Classes\DataProviders\BlackKey\Layers;

use GuzzleHttp\Client;
use Kuroneko\Comment\Classes\DataProviders\BlackKey\Interfaces\BlackKeyLayerInterface;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;

/**
 * Class BlackKeyApiLayer
 * @package Kuroneko\Comment\Classes\DataProviders\BlackKey\Layers
 * @author Giang Nguyen - 黒猫
 */
class BlackKeyApiLayer extends BaseLayerAbstract implements BlackKeyLayerInterface
{
    use WriteLogTrait;

    /**
     * @var string
     */
    private $apiBaseUrl;

    /**
     * @var array|bool|false|mixed|string|null
     */
    private $token;

    /**
     * @var Client;
     */
    private $client;

    /**
     * BlackKeyApiLayer constructor.
     */
    public function __construct()
    {
        $this->apiBaseUrl = env('COMMENT_API_BASE_URL');
        $this->token = env('COMMENT_API_TOKEN');
        $this->client = new Client([
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->token
            ]
        ]);
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListBlackKey($page, $perPage, $search = [])
    {
        try {
            $params = [
                'page' => $page,
                'per_page' => $perPage
            ];

            if (!empty($search['sort'])) {
                $params['sort'] = $search['sort'];
            }

            if (!empty($search['search-key'])) {
                $params['key'] = $search['search-key'];
            }

            $url = $this->apiBaseUrl . '/be/key-black/list-key';

            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
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
     * @return array|mixed
     */
    public function getListBlackKeyRaw()
    {
        try {
            $url = $this->apiBaseUrl . '/be/key-black/list-key-raw';
            return $this->execGet($url);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return [];
        }

    }

    /**
     * @param $url
     * @param array $params
     * @return array|mixed
     */
    private function execGet($url, $params = [])
    {
        $res = $this->client->get($url, [
            'query' => $params
        ]);
        $res = $res->getBody()->getContents();
        return empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
    }
}
