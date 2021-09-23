<?php


namespace Kuroneko\Comment\Classes\DataProviders\Comment\Interfaces;

/**
 * Interface CommentLayerInterface
 * @package Kuroneko\Comment\Classes\DataProviders\Comment\Interfaces
 */
interface CommentLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListComment($page, $perPage, $search = []);

    /**
     * @param $id
     * @return mixed
     */
    public function getLogComment($id);

    /**
     * @param array $search
     * @return mixed
     */
    public function getListCountComment($search = []);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getMostCountComment($page, $perPage, $search = []);

    /**
     * @param array $articleIds
     * @param array $status
     * @param array $search
     * @return mixed
     */
    public function getCountCommentOfListArticleByStatus($articleIds = [], $status = [],$search = []);

    /**
     * @param array $ids
     * @param array $statusAction
     * @param array $search
     * @return mixed
     */
    public function getCountCommentBeProcessedByUserCmsOfListUserByListStatus($ids = [], $statusAction = [], $search = []);

    /**
     * @param array $ids
     * @param array $status
     * @param array $search
     * @return mixed
     */
    public function getCountCommentOfListCatByListStatus($ids = [], $status = [], $search = []);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getCountCommentByAuthor($page, $perPage, $search = []);

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getCommentByArticle($page, $perPage, $search = []);
}
