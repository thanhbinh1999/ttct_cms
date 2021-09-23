<?php

namespace Kuroneko\Comment\Classes\DataProviders\Sticker;

use Kuroneko\Comment\Classes\DataProviders\Sticker\Interfaces\StickerDataProviderInterface;
use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;

/**
 * Class StickerDataProvider
 * @package Kuroneko\Comment\Classes\DataProviders\Sticker
 * @author Giang Nguyen - 黒猫
 */
class StickerDataProvider extends BaseDataProviderAbstract implements StickerDataProviderInterface
{

    /**
     * @inheritDoc
     */
    public function method(): string
    {
        return 'api';
    }

    /**
     * @inheritDoc
     */
    public function mapMethod(): array
    {
        return [
            'api' => 'Kuroneko\Comment\Classes\DataProviders\Sticker\Layers\StickerApiLayer'
        ];
    }

    /**
     * @inheritDoc
     */
    public function getListStickerByListId($ids)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getListSticker($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getStickerDetail($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
