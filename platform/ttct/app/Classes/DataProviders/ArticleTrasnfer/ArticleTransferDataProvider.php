<?php

namespace Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\Interfaces\ArticleTransferDataProviderInterface;

/**
 * Class ArticleTransferDataProvider
 * @package Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer
 * @author Giang Nguyen - 黒猫
 */
class ArticleTransferDataProvider extends BaseDataProviderAbstract implements ArticleTransferDataProviderInterface
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
            'api' => 'Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\Layers\ArticleTransferApiLayer'
        ];
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getTransfer($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListTransfer($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
