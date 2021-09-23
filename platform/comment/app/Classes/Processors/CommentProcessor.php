<?php

namespace Kuroneko\Comment\Classes\Processors;

use Elasticsearch\Endpoints\Cluster\Reroute;
use GuzzleHttp\Client;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\WriteLogTrait;

/**
 * Class CommentProcessor
 * @package Kuroneko\Comment\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class CommentProcessor extends BaseProcessorAbstracts
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
     * CommentProcessor constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->baseUrl = env('COMMENT_API_BASE_URL');
        $this->client = new Client();
    }

    /**
     * @param $data
     * @return bool
     */
    public function verifyComment($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/ucd/verify-comment';
                $res = $this->client->post($url, [
                    'json' => $data
                ]);

                $res = $res->getBody()->getContents();
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['status'] == 200) {
                    return "true";
                } else {
                    return "false";
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
    public function publishComment($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/ucd/publish-comment';
                $res = $this->client->post($url, [
                    'json' =>  $data
                ]);
                $res = $res->getBody()->getContents();
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['status'] == 200) {
                    return "true";
                } else {
                    return "false";
                }
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return "false";
        }
    }

    /**
     * @param $data
     * @return bool
     */
    public function sendBackComment($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/ucd/send-back-comment';
                $res = $this->client->post($url, [
                    'json' =>  $data
                ]);
                $res = $res->getBody()->getContents();
                return $res;
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['status'] == 200) {
                    return "true";
                } else {
                    return "false";
                }
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return "false";
        }
    }

    /**
     * @param $data
     * @return bool
     */
    public function deleteComment($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/ucd/delete-comment';
                $res = $this->client->post($url, [
                    'json' => $data
                ]);

                $res = $res->getBody()->getContents();
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['status'] == 200) {
                    return "true";
                } else {
                    return "false";
                }
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return "false";
        }
    }

    /**
     * @param $data
     * @return bool
     */
    public function restoreComment($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/ucd/restore-comment';
                $res = $this->client->post($url, [
                    'json' => $data
                ]);

                $res = $res->getBody()->getContents();
                return $res;
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

    public function updateContentAndAuthorComment($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/ucd/update-comment-content';
                $res = $this->client->post($url, [
                    'json' => $data
                ]);
                $res = $res->getBody()->getContents();
              
                $res = empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
                if ($res['status'] == 200) {
                    return "true";
                } else {
                    return "false";
                }
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return "false";
        }
    }

    /**
     * @param $data
     * @return bool
     */
    public function updateReportComment($data)
    {
        try {
            if (!empty($data)) {
                $url = $this->baseUrl . '/be/ucd/report-comment';
                $res = $this->client->post($url, [
                    'form_params' => [
                        'data' => json_encode($data)
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
