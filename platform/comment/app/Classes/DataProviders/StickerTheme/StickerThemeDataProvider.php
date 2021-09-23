<?php

namespace Kuroneko\Comment\Classes\DataProviders;

use Kuroneko\Comment\Classes\DataProviders\Interfaces\StickerThemeDataProviderInterface;
use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use function League\Uri\parse;

/**
 * Class StickerThemeDataProvider
 * @package Kuroneko\Comment\Classes\DataProviders
 * @author Giang Nguyen - 黒猫
 */
class StickerThemeDataProvider extends BaseDataProviderAbstract implements StickerThemeDataProviderInterface
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
            'api' => 'Kuroneko\Comment\Classes\DataProviders\Layers\StickerThemeApiLayer'
        ];
    }

    /**
     * @inheritDoc
     */
    public function getListStickerTheme($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getStickerThemeDetail($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
