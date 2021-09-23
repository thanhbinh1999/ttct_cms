<?php
namespace Kuroneko\Menu\Classes\DataProviders\MenuItem\Interfaces;

/**
 * Interface MenuItemLayerInterface
 * @package Kuroneko\Menu\Classes\DataProviders\MenuItem\Interfaces
 * @author Giang Nguyen - 黒猫
 */
interface MenuItemLayerInterface
{
    /**
     * @param $id
     * @return mixed
     */
    public function prepareDataBuild($id);

    /**
     * @param $id
     * @return mixed
     */
    public function editEdit($id);
}
