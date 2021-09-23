<?php


namespace Kuroneko\Comment\Classes\Processors;


use GuzzleHttp\Client;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\WriteLogTrait;

/**
 * Class BlackKeyProcessor
 * @package Kuroneko\Comment\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class BlackKeyProcessor extends BaseProcessorAbstracts
{
    use WriteLogTrait;

    /**
     * @var Client;
     */
    private $client;

    /**\
     * @var array|bool|false|mixed|string|null
     */
    private $baseUrl = '';

    /**
     * @var array|bool|false|mixed|string|null
     */
    private $apiToken = '';

    /**
     * BlackKeyProcessor constructor.
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
     * @param $key
     * @return bool
     */
    public function storeBlackKey($key)
    {
        try {
            if (!empty($key)) {
                $url = $this->baseUrl . '/be/key-black/create';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'key' => $key
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
     * @param $id
     * @return bool
     */
    public function deleteBlackKey($id)
    {
        try {
            if (!empty($id)) {
                $url = $this->baseUrl . '/be/key-black/delete';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'id' => $id
                    ]
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
