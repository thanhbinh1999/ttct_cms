<?php
namespace Kuroneko\Menu\Classes\DataProviders\Menu\Interfaces;

/**
 * Interface MenuLayerInterface
 * @package Kuroneko\Menu\Classes\DataProviders\Menu\Interfaces
 * @author Giang Nguyen - 黒猫
 */
interface MenuLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListMenu($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getEdit($id);
}
