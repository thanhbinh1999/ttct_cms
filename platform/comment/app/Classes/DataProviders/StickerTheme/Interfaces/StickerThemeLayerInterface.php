<?php

namespace Kuroneko\Comment\Classes\DataProviders\Interfaces;

/**
 * Interface StickerThemeLayerInterface
 * @package Kuroneko\Comment\Classes\DataProviders\Interfaces
 */
interface StickerThemeLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListStickerTheme($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getStickerThemeDetail($id);
}
