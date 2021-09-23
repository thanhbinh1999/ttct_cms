<?php
namespace Kuroneko\Comment\Classes\DataProviders\Sticker\Interfaces;

/**
 * Interface StickerLayerInterface
 * @package Kuroneko\Comment\Classes\DataProviders\Sticker\Interfaces
 */
interface StickerLayerInterface
{
    /**
     * @param $ids
     * @return mixed
     */
    public function getListStickerByListId($ids);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListSticker($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getStickerDetail($id);
}
