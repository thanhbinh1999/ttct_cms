<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Category;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Category\Interfaces\CategoryDataProviderInterface;

/**
 * Class CategoryDataProvider
 * @package Kuroneko\Ttct\Classes\DataProviders\Category
 * @author Giang Nguyen - 黒猫
 */
class CategoryDataProvider extends BaseDataProviderAbstract implements CategoryDataProviderInterface
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
            'api' => 'Kuroneko\Ttct\Classes\DataProviders\Category\Layers\CategoryApiLayer'
        ];
    }

    public function getListCategories($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getForEdit($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getDetail($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $data
     * @return array|mixed
     */
    public function selectCategory($data)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
