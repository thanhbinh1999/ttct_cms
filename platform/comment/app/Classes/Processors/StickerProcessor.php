<?php


namespace Kuroneko\Comment\Classes\Processors;


use GuzzleHttp\Client;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\WriteLogTrait;

/**
 * Class StickerProcessor
 * @package Kuroneko\Comment\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class StickerProcessor extends BaseProcessorAbstracts
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
     * StickerProcessor constructor.
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
     * @param $data
     * @return bool
     */
    public function updateSticker($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/sticker/update';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'data' => json_encode([$data])
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
     * @param $data
     * @return bool
     */
    public function storeSticker($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/sticker/create';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'data' => json_encode([$data])
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
}
