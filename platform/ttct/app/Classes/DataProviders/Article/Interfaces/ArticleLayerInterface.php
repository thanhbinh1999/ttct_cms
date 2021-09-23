<?php


namespace Kuroneko\Ttct\Classes\DataProviders\Article\Interfaces;

/**
 * Interface ArticleLayerInterface
 * @package Kuroneko\Ttct\Classes\DataProviders\Article\Interfaces
 * @author Giang Nguyen - 黒猫
 */
interface ArticleLayerInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function selectArticleForEditTopical($data);

    /**
     * @param $data
     * @return mixed
     */
    public function getManyArticleForEditTopical($data);

    /**
     * @param $id
     * @return mixed
     */
    public function getDataEdit($id);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListDraft($page, $perPage, $search = []);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListArticle($page, $perPage, $search = []);

}
