<?php


namespace Kuroneko\Ttct\Classes\DataProviders\Category\Interfaces;


interface CategoryLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListCategories($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getForEdit($id);

    /**
     * @param $data
     * @return mixed
     */
    public function selectCategory($data);
}
