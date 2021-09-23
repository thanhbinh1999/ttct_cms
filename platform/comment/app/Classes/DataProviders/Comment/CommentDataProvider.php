<?php

namespace Kuroneko\Comment\Classes\DataProviders\Comment;

use Kuroneko\DataProvider\Abstracts\BaseDataProviderAbstract;
use Kuroneko\Comment\Classes\DataProviders\Comment\Interfaces\CommentDataProviderInterface;

/**
 * Class CommentDataProvider
 * @package Kuroneko\Comment\Classes\DataProviders\Comment
 * @author Giang Nguyen - 黒猫
 */
class CommentDataProvider extends BaseDataProviderAbstract implements CommentDataProviderInterface
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
            'api' => 'Kuroneko\Comment\Classes\DataProviders\Comment\Layers\CommentApiLayer'
        ];
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array
     */
    public function getListComment($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getLogComment($id)
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getListCountComment($search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getMostCountComment($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }


    /**
     * @inheritDoc
     */
    public function getCountCommentOfListArticleByStatus($articleIds = [], $status = [], $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getCountCommentBeProcessedByUserCmsOfListUserByListStatus($ids = [], $statusAction = [], $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getCountCommentOfListCatByListStatus($ids = [], $status = [], $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getCountCommentByAuthor($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }

    /**
     * @inheritDoc
     */
    public function getCommentByArticle($page, $perPage, $search = [])
    {
        return parent::call(__FUNCTION__, ...func_get_args());
    }
}
