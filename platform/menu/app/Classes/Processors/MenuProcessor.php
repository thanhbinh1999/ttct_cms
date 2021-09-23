<?php

namespace Kuroneko\Menu\Classes\Processors;

use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class MenuProcessor
 * @package Kuroneko\Menu\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class MenuProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

    /**
     * MenuProcessor constructor.
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
            $url = $this->getBaseUrl() . '/be/menus/update/' . $id;
            return $this->execPost($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }
}
