<?php


namespace Kuroneko\Ttct\Classes\DataProviders\Resource\Interfaces;


interface ResourceLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListResource($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getEdit($id);
}
