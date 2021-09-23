<?php

namespace Kuroneko\Menu\Classes\DataProviders\MenuItem;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Menu\Classes\DataProviders\MenuItem\Interfaces\MenuItemDataProviderInterface;

/**
 * Class MenuItemDataProvider
 * @package Kuroneko\Menu\Classes\DataProviders\MenuItem
 * @author Giang Nguyen - 黒猫
 */
class MenuItemDataProvider extends BaseDataProviderAbstract implements MenuItemDataProviderInterface
{
    /**
     * @return string
     */
    public function method(): string
    {
        return 'api';
    }

    /**
     * @return array
     */
    public function mapMethod(): array
    {
        return [
            'api' => 'Kuroneko\Menu\Classes\DataProviders\MenuItem\Layers\MenuItemApiLayer'
        ];
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function prepareDataBuild($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function editEdit($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
