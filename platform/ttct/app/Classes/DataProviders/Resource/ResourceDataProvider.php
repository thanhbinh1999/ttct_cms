<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Resource;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Resource\Interfaces\ResourceDataProviderInterface;

/**
 * Class ResourceDataProvider
 * @package Kuroneko\Ttct\Classes\DataProviders\Resource
 * @author Giang Nguyen - 黒猫
 */
class ResourceDataProvider extends BaseDataProviderAbstract implements ResourceDataProviderInterface
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
            'api' => 'Kuroneko\Ttct\Classes\DataProviders\Resource\Layers\ResourceApiLayer'
        ];
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListResource($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getEdit($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
