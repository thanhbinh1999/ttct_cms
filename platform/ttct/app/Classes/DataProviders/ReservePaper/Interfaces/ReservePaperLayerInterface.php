<?php


namespace Kuroneko\Ttct\Classes\DataProviders\ReservePaper\Interfaces;


interface ReservePaperLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListReservePaper($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getDataEdit($id);
}
