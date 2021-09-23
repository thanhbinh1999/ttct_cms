<?php

namespace Kuroneko\Menu\Classes\DataProviders\Menu;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Menu\Classes\DataProviders\Menu\Interfaces\MenuDataProviderInterface;

/**
 * Class MenuDataProvider
 * @package Kuroneko\Menu\Classes\DataProviders\Menu
 * @author Giang Nguyen - 黒猫
 */
class MenuDataProvider extends BaseDataProviderAbstract implements MenuDataProviderInterface
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
            'api' => 'Kuroneko\Menu\Classes\DataProviders\Menu\Layers\MenuApiLayer'
        ];
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListMenu($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getEdit($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
