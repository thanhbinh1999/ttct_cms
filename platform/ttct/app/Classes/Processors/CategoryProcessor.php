<?php


namespace Kuroneko\Ttct\Classes\Processors;


use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class CategoryProcessor
 * @package Kuroneko\Ttct\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class CategoryProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

    /**
     * CategoryProcessor constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $id
     * @param $data
     * @return array
     */
    public function update($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/update/' . $id;
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
    public function store($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/store';
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
     * @param $id
     * @return array
     */
    public function restore($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/restore/' . $id;
            return $this->execPost($url, []);
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
     * @return array
     */
    public function delete($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/delete/' . $id;
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
     * @param array $data
     * @return array
     */
    public function updateStatusForTopical($id, $data = [])
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/update-status-for-topical/' . $id;
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
    public function updateTopical($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/categories/update-topical/' . $id;
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
