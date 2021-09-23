<?php


namespace Kuroneko\Comment\Classes\Processors;


use GuzzleHttp\Client;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\WriteLogTrait;

/**
 * Class StickerThemeProcessor
 * @package Kuroneko\Comment\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class StickerThemeProcessor extends BaseProcessorAbstracts
{
    use WriteLogTrait;

    /**
     * @var Client;
     */
    private $client;

    /**
     * @var array|bool|false|mixed|string|null
     */
    private $baseUrl = '';

    /**
     * @var array|bool|false|mixed|string|null
     */
    private $apiToken = '';

    /**
     * StickerThemeProcessor constructor.
     */
    public function __construct()
    {
        $this->baseUrl = env('COMMENT_API_BASE_URL');
        $this->apiToken = env('COMMENT_API_TOKEN');
        $this->client = new Client([
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiToken
            ]
        ]);
    }

    /**
     * @param $theme
     * @param $stickers
     * @return bool
     */
    public function storeStickerTheme($theme, $stickers)
    {
        try {
            if (!empty($theme) && !empty($stickers)) {
                $url = $this->baseUrl . '/be/sticker-theme/create';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'data' => json_encode([
                            'theme' => $theme,
                            'stickers' => $stickers
                        ])
                    ],
                ]);
                $res = $res->getBody()->getContents();
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['success'] == true) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return false;
        }
    }

    /**
     * @param $theme
     * @param $stickers
     * @return bool
     */
    public function updateStickerTheme($theme, $stickers)
    {
        try {
            if (!empty($theme)) {
                $url = $this->baseUrl . '/be/sticker-theme/update';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'data' => json_encode([
                            'theme' => $theme,
                            'stickers' => $stickers
                        ])
                    ],
                ]);
                $res = $res->getBody()->getContents();
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);

                if ($res['success'] == true) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return false;
        }
    }

    /**
     * @param $id
     * @return bool
     */
    public function deleteStickerTheme($id)
    {
        try {
            if (!empty($id)) {
                $url = $this->baseUrl . '/be/sticker-theme/delete';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'id' => $id
                    ],
                ]);
                $res = $res->getBody()->getContents();
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['success'] == true) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return false;
        }
    }

    /**
     * @param $id
     * @return bool
     */
    public function restoreStickerTheme($id)
    {
        try {
            if (!empty($id)) {
                $url = $this->baseUrl . '/be/sticker-theme/restore';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'id' => $id
                    ],
                ]);
                $res = $res->getBody()->getContents();
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['success'] == true) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return false;
        }
    }
}
