<?php

namespace Kuroneko\Menu\Classes\DataProviders\MenuItem\Layers;

use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Menu\Classes\DataProviders\MenuItem\Interfaces\MenuItemLayerInterface;

/**
 * Class MenuItemApiLayer
 * @package Kuroneko\Menu\Classes\DataProviders\MenuItem\Layers
 * @author Giang Nguyen - 黒猫
 */
class MenuItemApiLayer extends BaseLayerAbstract implements MenuItemLayerInterface
{
    use CurlTrait;

    /**
     * MenuItemApiLayer constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function prepareDataBuild($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/menus/menu-items/prepare-data-build/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function editEdit($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/menus/menu-items/edit/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }
}
