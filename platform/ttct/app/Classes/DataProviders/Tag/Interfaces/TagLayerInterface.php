<?php


namespace Kuroneko\Ttct\Classes\DataProviders\Tag\Interfaces;


interface TagLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListTag($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getForEdit($id);

    /**
     * @param $data
     * @return mixed
     */
    public function selectTag($data);
}
