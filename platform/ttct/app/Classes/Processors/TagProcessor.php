<?php

namespace Kuroneko\Ttct\Classes\Processors;


use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class TagProcessor
 * @package Kuroneko\Ttct\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class TagProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

    /**
     * TagProcessor constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $id
     * @param $data
     * @return array|mixed
     */
    public function update($id, $data)
    {
        try {
            if (!empty($data)) {
                $url = $this->getBaseUrl() . '/be/tags/update/' . $id;
                return $this->execPost($url, $data);
            }
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function delete($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/delete/' . $id;
            return $this->execDelete($url);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function restore($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/restore/' . $id;
            return $this->execPost($url);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }


    /**
     * @param $data
     * @return array
     */
    public function store($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/store';
            return $this->execPost($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $id
     * @param $data
     * @return array
     */
    public function updateTheme($id, $data = [])
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/update-theme/' . $id;
            return $this->execPostFile($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $data
     * @return array
     */
    public function storeTheme($data = [])
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/store-theme';
            return $this->execPostFile($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $data
     * @return array
     */
    public function storeTagForCreateUpdateArticle($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/store-tag-for-create-update-article';
            return $this->execPost($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $data
     * @return array
     */
    public function storeThemeForCreateUpdateArticle($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/tags/store-theme-for-create-update-article';
            return $this->execPostFile($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }
}
