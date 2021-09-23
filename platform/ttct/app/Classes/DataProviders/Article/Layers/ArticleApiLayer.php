<?php

namespace Kuroneko\Ttct\Classes\DataProviders\Article\Layers;

use Exception;
use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Ttct\Classes\DataProviders\Article\Interfaces\ArticleLayerInterface;

/**
 * Class ArticleApiLayer
 * @package Kuroneko\Ttct\Classes\DataProviders\Article\Layers
 * @author Giang Nguyen - 黒猫
 */
class ArticleApiLayer extends BaseLayerAbstract implements ArticleLayerInterface
{
    use CurlTrait;

    /**
     * ArticleApiLayer constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $data
     * @return array|mixed
     */
    public function selectArticleForEditTopical($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/articles/select-article-for-edit-topical';
            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $data
     * @return array|mixed
     */
    public function getManyArticleForEditTopical($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/articles/get-many-article-for-edit-topical';
            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getDataEdit($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/articles/get-data-edit/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }

    public function getListDraft($page, $perPage, $search = [])
    {
        try {
            $data = [
                'pagination' => [
                    'page' => $page,
                    'perpage' => $perPage
                ],
                'sort' => [],
                'query' => []
            ];


            if (!empty($search['sort'])) {
                $data['sort'] = $search['sort'];
            }

            if (!empty($search['key'])) {
                $data['query']['search-key'] = $search['key'];
            }

            if (!empty($search['status'])) {
                $data['query']['status'] = $search['status'];
            }

            if (!empty($search['creator'])) {
                $data['query']['creator'] = $search['creator'];
            }

            $url = $this->getBaseUrl() . '/be/articles/datatable-for-draft';

            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [
                'meta' => [
                    'page' => $page,
                    'pages' => 4,
                    'perpage' => $perPage,
                    'total' => 0
                ],
                'data' => []
            ];
        }
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListArticle($page, $perPage, $search = [])
    {
        try {
            $data = [
                'pagination' => [
                    'page' => $page,
                    'perpage' => $perPage
                ],
                'sort' => [],
                'query' => []
            ];


            if (!empty($search['sort'])) {
                $data['sort'] = $search['sort'];
            }

            if (!empty($search['key'])) {
                $data['query']['search-key'] = $search['key'];
            }

            if (!empty($search['search-to-id'])) {
                $data['query']['search-to-id'] = $search['search-to-id'];
            }

            if (!empty($search['status'])) {
                $data['query']['status'] = $search['status'];
            }

            if (!empty($search['creator'])) {
                $data['query']['creator'] = $search['creator'];
            }

            if (!empty($search['author'])) {
                $data['query']['author'] = $search['author'];
            }

            if (!empty($search['category'])) {
                $data['query']['category'] = $search['category'];
            }

            if (!empty($search['theme'])) {
                $data['query']['theme'] = $search['theme'];
            }

            if (!empty($search['from'])) {
                $data['query']['from'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $data['query']['to'] = $search['to'];
            }

            $url = $this->getBaseUrl() . '/be/articles/datatable';

            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [
                'meta' => [
                    'page' => $page,
                    'pages' => 4,
                    'perpage' => $perPage,
                    'total' => 0
                ],
                'data' => []
            ];
        }
    }

    /**
     *@param $page
     *@param $per_page
     *@param $search
     */

    public function showRelatedArticle($page, $per_page, $search = [])
    {
        try {
            $data = [];
            $data['page'] = $page;
            $data['per_page'] = $per_page;

            if (!empty($search['key'])) {
                $data['key'] = $search['key'];
            }
            $url =  $this->getBaseUrl() . '/be/articles/related-article';
            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [
                'data' => []
            ];
        }
    }

    /**
     * @param $page:number,$per_page:number,$serch:array
     * @return json
     */

    public function selectArticleCategory($page, $per_page, $search = [])
    {
       
        try {
            $data = [];
            $data['page'] = $page;
            $data['per_page'] = $per_page;

            if (!empty($search['key'])) {
                $data['key'] = $search['key'];
            }
            $url =  $this->getBaseUrl() . '/be/articles/select-article-category';
            return $this->execPost($url, $data)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->jsonn([
                'status' => 500,
                'message' => 'Lỗi hệ thống vui lòng thử lại',
                'data' => []
            ]);
        }
    }
}
