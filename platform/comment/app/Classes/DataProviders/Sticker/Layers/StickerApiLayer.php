<?php

namespace Kuroneko\Comment\Classes\DataProviders\Sticker\Layers;

use GuzzleHttp\Client;
use Kuroneko\Comment\Classes\DataProviders\Sticker\Interfaces\StickerLayerInterface;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;

/**
 * Class StickerApiLayer
 * @package Kuroneko\Comment\Classes\DataProviders\Sticker\Layers
 * @author Giang Nguyen - 黒猫
 */
class StickerApiLayer extends BaseLayerAbstract implements StickerLayerInterface
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
     * StickerApiLayer constructor.
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
    public function getListSticker($page, $perPage, $search = [])
    {
        try {
            $params = [
                'page' => $page,
                'per_page' => $perPage,
                'app' => 19,
                'get_sk' => 1,
                'begin_time' => '-1'
            ];
            if (!empty($search['status'])) {
                $params['status'] = $search['status'];
            }
            if (!empty($search['begin_time'])) {
                $params = $search['begin_time'];
            }

            if (!empty($search['search-key'])) {
                $params['name'] = $search['search-key'];
            }

            if (!empty($search['theme']) && $search['theme'] != 'all') {
                $params['theme_id'] = $search['theme'];
            }

            $url = $this->apiBaseUrl . '/be/sticker/get-list-sticker';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
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
     * @param $id
     * @return array|mixed
     */
    public function getStickerDetail($id)
    {
        try {
            $params = [
                'id' => $id
            ];
            $url = $this->apiBaseUrl . '/be/sticker/get-sticker';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return [];
        }
    }

    /**
     * @param $ids
     * @return array|mixed
     */
    public function getListStickerByListId($ids)
    {
        try {
            if (!is_array($ids) || empty($ids)) return [];

            $params = [
                'ids' => \GuzzleHttp\json_encode($ids)
            ];
            $url = $this->apiBaseUrl . '/be/sticker/get-list-sicker-by-list-id';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
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
