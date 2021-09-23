<?php

namespace Kuroneko\Comment\Classes\DataProviders\Layers;

use GuzzleHttp\Client;
use Kuroneko\Comment\Classes\DataProviders\Interfaces\StickerThemeLayerInterface;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;

/**
 * Class StickerThemeApiLayer
 * @package Kuroneko\Comment\Classes\DataProviders\Layers
 * @author Giang Nguyen - 黒猫
 */
class StickerThemeApiLayer extends BaseLayerAbstract implements StickerThemeLayerInterface
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
     * StickerThemeApiLayer constructor.
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
    public function getListStickerTheme($page, $perPage, $search = [])
    {
        try {
            $params = [
                'page' => $page,
                'per_page' => $perPage,
                'begin_time' => '-1',
                'app' => 19
            ];

            if (!empty($search['get_sticker'])) {
                $params['get_sticker'] = $search['get_sticker'];
            }

            if (!empty($search['status'])) {
                $params['status'] = $search['status'];
            } else {
                $params['status'] = 'active';
            }

            if (!empty($search['search-key'])) {
                $params['theme_name'] = $search['search-key'];
            }
            $url = $this->apiBaseUrl . '/be/sticker-theme/get-list-theme';

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
    public function getStickerThemeDetail($id)
    {
        try {
            $params = [
                'id' => $id,
                'status' => 'active'
            ];
            $url = $this->apiBaseUrl . '/be/sticker-theme/get-sticker-theme';
            return $this->execGet($url, $params);
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
