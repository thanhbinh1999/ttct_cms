<?php


namespace Kuroneko\Core\Traits;


use GuzzleHttp\Client;

/**
 * Trait CurlTrait
 * @package Kuroneko\Core\Traits
 * @author Giang Nguyen
 */
trait CurlTrait
{

    /**
     * @var Client;
     */
    private $client;

    private $baseUrl = '';

    private function clientInit()
    {
        $this->baseUrl = env('API_BASE_URL');
        $this->client = new Client([
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json'
            ]
        ]);
    }

    /**
     * @return string
     */
    private function getBaseUrl()
    {
        return $this->baseUrl;
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
        $code = $res->getStatusCode();
        $res = $res->getBody()->getContents();
        return [
            'res' => empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true),
            'code' => $code
        ];
    }
    
    /**
     * @param $url
     * @param array $params
     * @return array|mixed
     */

    private function setParamExecPost($name,$url, $params = [])
    {
        $res = $this->client->post($url, [
            $name => $params
        ]);
        $code = $res->getStatusCode();
        $res = $res->getBody()->getContents();
        return $res;
        
    }




    /**
     * @param $url
     * @param array $data
     * @return array
     */
    private function execPost($url, $data = [])
    {
        $res = $this->client->post($url, [
            'form_params' => $data
        ]);
        $code = $res->getStatusCode();
        $res = $res->getBody()->getContents();

        return [
            'res' => empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true),
            'code' => $code
        ];
    }


    /**
     * @param $url
     * @param array $data
     * @param array $multiPart
     * @return array
     */
    private function execPostFile($url, $data = [])
    {
        $res = $this->client->post($url, [
            'multipart' => $data
        ]);
        $code = $res->getStatusCode();
        $res = $res->getBody()->getContents();

        return [
            'res' => empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true),
            'code' => $code
        ];
    }

    /**
     * @param $url
     * @param array $data
     * @return array|mixed
     */
    private function execDelete($url)
    {
        $res = $this->client->delete($url);
        $code = $res->getStatusCode();
        $res = $res->getBody()->getContents();
        return [
            'res' => empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true),
            'code' => $code
        ];
    }

    /**
     * @param $exception
     * @return mixed
     */
    private function getErrorRes($exception)
    {
        return json_decode($exception->getResponse()->getBody()->getContents());
    }
}
