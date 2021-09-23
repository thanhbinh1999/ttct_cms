<?php


namespace Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\Interfaces;

/**
 * Interface ArticleTransferLayerInterface
 * @package Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\Interfaces
 *
 */
interface ArticleTransferLayerInterface
{
    /**
     * @param $id
     * @return mixed
     */
    public function getTransfer($id);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListTransfer($page, $perPage, $search = []);
}
