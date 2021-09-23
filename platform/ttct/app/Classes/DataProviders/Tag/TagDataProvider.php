<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Tag;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Tag\Interfaces\TagDataProviderInterface;

/**
 * Class TagDataProvider
 * @package Kuroneko\Ttct\Classes\DataProviders\Tag
 * @author Giang Nguyen - 黒猫
 */
class TagDataProvider extends BaseDataProviderAbstract implements TagDataProviderInterface
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
            'api' => 'Kuroneko\Ttct\Classes\DataProviders\Tag\Layers\TagApiLayer'
        ];
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array
     */
    public function getListTag($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getForEdit($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $data
     * @return array|mixed
     */
    public function selectTag($data)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
