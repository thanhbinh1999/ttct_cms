<?php

namespace Kuroneko\Ttct\Classes\DataProviders\ReservePaper;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Ttct\Classes\DataProviders\ReservePaper\Interfaces\ReservePaperDataProviderInterface;

/**
 * Class ReservePaperDataProvider
 * @package Kuroneko\Ttct\Classes\DataProviders\ReservePaper
 * @author Giang nguyen  - 黒猫
 */
class ReservePaperDataProvider extends BaseDataProviderAbstract implements ReservePaperDataProviderInterface
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
            'api' => 'Kuroneko\Ttct\Classes\DataProviders\ReservePaper\Layers\ReservePaperApiLayer'
        ];
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListReservePaper($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getDataEdit($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
