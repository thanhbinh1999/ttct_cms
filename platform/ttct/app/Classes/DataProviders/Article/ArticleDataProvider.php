<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Article;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Article\Interfaces\ArticleDataProviderInterface;

/**
 * Class ArticleDataProvider
 * @package Kuroneko\Ttct\Classes\DataProviders\Article
 * @author Giang Nguyen - 黒猫
 */
class ArticleDataProvider extends BaseDataProviderAbstract implements ArticleDataProviderInterface
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
            'api' => 'Kuroneko\Ttct\Classes\DataProviders\Article\Layers\ArticleApiLayer'
        ];
    }

    /**
     * @param $data
     * @return mixed
     */
    public function selectArticleForEditTopical($data)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $data
     * @return array|mixed
     */
    public function getManyArticleForEditTopical($data)
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

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListDraft($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListArticle($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
    *@param $page
    *@param $per_page
    *@param $serach
    */
    public function showRelatedArticle($page, $per_page, $serach = []){
       return parent::call(__FUNCTION__,...func_get_args());
    }
    
    /**
     * @param $page:number,$per_page:number,$search:array
     * @return json
     */

    public function selectArticleCategory($page,$per_page,$search=[]){
        return parent::call(__FUNCTION__,...func_get_args());
    }
}
