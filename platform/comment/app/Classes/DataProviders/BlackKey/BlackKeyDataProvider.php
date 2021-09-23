<?php

namespace Kuroneko\Comment\Classes\DataProviders\BlackKey;

use Kuroneko\Comment\Classes\DataProviders\BlackKey\Interfaces\BlackKeyDataProviderInterface;
use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;

/**
 * Class BlackKeyDataProvider
 * @package Kuroneko\Comment\Classes\DataProviders\BlackKey
 * @author Giang Nguyen - 黒猫
 */
class BlackKeyDataProvider extends BaseDataProviderAbstract implements BlackKeyDataProviderInterface
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
            'api' => 'Kuroneko\Comment\Classes\DataProviders\BlackKey\Layers\BlackKeyApiLayer'
        ];
    }

    /**
     * @inheritDoc
     */
    public function getListBlackKey($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getListBlackKeyRaw()
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
