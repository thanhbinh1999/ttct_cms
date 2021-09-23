<?php


namespace Kuroneko\Menu\Classes\Processors;


use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class MenuItemProcessor
 * @package Kuroneko\Menu\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class MenuItemProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

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
            $url = $this->getBaseUrl() . '/be/menus/menu-items/update/' . $id;
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
    public function updateOrder($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/menus/menu-items/update-order';
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
    public function store($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/menus/menu-items/store/' . $id;
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
     * @return array|mixed
     */
    public function delete($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/menus/menu-items/delete/' . $id;
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
     * @return array
     */
    public function restore($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/menus/menu-items/restore/' . $id;
            return $this->execPost($url);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

}
