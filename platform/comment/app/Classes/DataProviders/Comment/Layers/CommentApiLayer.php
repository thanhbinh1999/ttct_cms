<?php

namespace Kuroneko\Comment\Classes\DataProviders\Comment\Layers;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Http;
use Kuroneko\Core\Traits\WriteLogTrait;
use GuzzleHttp\Exception\ClientException;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Elasticsearch\Endpoints\Cluster\Reroute;

use Kuroneko\Comment\Classes\DataProviders\Comment\Interfaces\CommentLayerInterface;

/**
 * Class CommentApiLayer
 * @package Kuroneko\Comment\Classes\DataProviders\Comment\Layers
 * @author Giang Nguyen - 黒猫
 */
class CommentApiLayer extends BaseLayerAbstract implements CommentLayerInterface
{
    use WriteLogTrait;

    /**
     * @var string
     */
    private $apiBaseUrl;

    /**
     * @var array|bool|false|mixed|string|null
     */
    private $token;
    /**
     * @var Client;
     */
    private $client;

    /**
     * CommentApiLayer constructor.
     */

    public function __construct()
    {
        $this->apiBaseUrl = env('COMMENT_API_BASE_URL');
        $this->token = env('COMMENT_API_TOKEN');
        $this->client = new \GuzzleHttp\Client();
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListComment($page, $perPage, $search = [])
    {
        try {

            $params = '';
            $url = $this->apiBaseUrl . $this->resolveUrlGetComment($search['status']);
            $params .= "?app=19&search[app]=" . env('APP_ID') . "&";

            if (!empty($search['author'])) {
                $params .= "search[author]=" . $search['author'] . "&";
            }

            if (!empty($search['from'])) {

                $params .= "search[begin_time]=" . $search['from'] . "&";
            } else {
                $params .= "search[begin_time]=null&";
            }

            // if (!empty($search['to'])) {
            //     $params['search']['end_time'] = $search['to']."&";
            // }

            if (!empty($search['category'])) {
                $params .= "search[term]=" . $search['category'] . "&";
            }

            if (!empty($search['sort'])) {
               $params .= "search[sort]=" . $search['sort'] . "&";
            }

            if (!empty($search['user']) && $search['user'] != 'all') {

                $params .= "search[id_user]=" . $search['user']."&";
            }
            
            $params .= "search[page]=".$page."&";
            $params .= "search[per_page]=".$perPage."&";
            $params .= "search[time_type]=custom";
            $data = $this->execGet($url, $params);
            return [
                'current_page' => intval($page),
                'per_page' => intval($perPage),
                'total_items' => $data['total_items'],
                'total_pages' => ceil(intval($data['total_items']) / intval($perPage)),
                'data' => !empty($data['data']) ? $data['data'] : []
            ];

        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [
                'current_page' => intval($page),
                'per_page' => intval($perPage),
                'total_items' => 0,
                'total_pages' => 10,
                'data' => [],
            ];
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getLogComment($id)
    {
        try {
            $params = [
                'comment_id' => $id
            ];
            $url = $this->apiBaseUrl . '/be/get-comment/list-log-comment';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param array $search
     * @return array|mixed
     */
    public function getListCountComment($search = [])
    {
        try {
            $params = [
                'app' => env('APP_ID'),
                'begin_time' => '-1',
                'cm_type' => 'all',
                'status' => '[]'
            ];

            if (!empty($search['from'])) {
                $params['begin_time'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $params['end_time'] = $search['to'];
            }

            if (!empty($search['status'])) {
                $params['status'] = json_encode($search['status']);
            }
            $url = $this->apiBaseUrl . '/be/get-comment/get-list-count-comment';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $this->printException($exception);
            return [];
        }
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getMostCountComment($page, $perPage, $search = [])
    {
        try {
            $params = [
                'app' => env('APP_ID'),
                'begin_time' => '-1',
                'status_sort' => 'all'
            ];

            if (!empty($search['from'])) {
                $params['begin_time'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $params['end_time'] = $search['to'];
            }

            if (!empty($search['cat'])) {
                $params['term'] = $search['cat'];
            }

            if (!empty($search['status_sort'])) {
                $params['status_sort'] = $search['status_sort'];
            }

            $url = $this->apiBaseUrl . '/be/get-comment/get-most-count-comment';

            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param array $articleIds
     * @param array $status
     * @param array $search
     * @return array|mixed
     */
    public function getCountCommentOfListArticleByStatus($articleIds = [], $status = [], $search = [])
    {
        try {
            $params = [
                'app' => env('APP_ID'),
                'target_ids' => json_encode($articleIds),
                'status' => json_encode($status)
            ];

            if (!empty($search['from'])) {
                $params['begin_time'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $params['end_time'] = $search['to'];
            }

            if (!empty($search['sort'])) {
                $params['status_sort'] = $search['sort'];
            }

            if (!empty($search['cat'])) {
                $params['term'] = $search['cat'];
            }
            $url = $this->apiBaseUrl . '/be/get-comment/get-count-comment-of-list-target-by-status';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param array $ids
     * @param array $statusAction
     * @param array $search
     * @return array|mixed
     */
    public function getCountCommentBeProcessedByUserCmsOfListUserByListStatus($ids = [], $statusAction = [], $search = [])
    {
        try {
            if (empty($ids)) return [];

            $params = [
                'app' => env('APP_ID'),
                'begin_time' => '-1',
                'user_ids' => json_encode($ids)
            ];

            if (empty($statusAction)) {
                $params['status_action'] = json_encode([
                    ['action' => 'verify', 'status' => 'verified'],
                    ['action' => 'delete', 'status' => 'deleted'],
                    ['action' => 'publish', 'status' => 'published']
                ]);
            }

            if (!empty($search['from'])) {
                $params['begin_time'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $params['end_time'] = $search['to'];
            }

            if (!empty($search['cat'])) {
                $params['term'] = $search['cat'];
            }

            $url = $this->apiBaseUrl . '/be/get-comment/get-count-comment-be-processed-by-user-cms-of-list-user-by-list-status';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param array $ids
     * @param array $status
     * @param array $search
     * @return array|mixed
     */
    public function getCountCommentOfListCatByListStatus($ids = [], $status = [], $search = [])
    {
        try {
            if (empty($ids)) return [];
            $params = [
                'app' => env('APP_ID'),
                'term_ids' => json_encode($ids),
                'status' => json_encode(['verified', 'deleted', 'published']),
                'begin_time' => '-1'
            ];

            if (!empty($search['from'])) {
                $params['begin_time'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $params['end_time'] = $search['to'];
            }

            $url = $this->apiBaseUrl . '/be/get-comment/get-count-comment-of-list-term-by-list-status';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getCountCommentByAuthor($page, $perPage, $search = [])
    {
        try {
            $params = [
                'app' => env('APP_ID'),
                'page' => $page,
                'per_page' => $perPage,
                'begin_time' => '-1',
                'status_sort' => 'all'
            ];

            if (!empty($search['from'])) {
                $params['begin_time'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $params['end_time'] = $search['to'];
            }

            if (!empty($search['status_sort'])) {
                $params['status_sort'] = $search['status_sort'];
            }

            if (!empty($search['cat'])) {
                $params['term'] = $search['cat'];
            }

            $url = $this->apiBaseUrl . '/be/get-comment/get-most-count-author-comment';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getCommentByArticle($page, $perPage, $search = [])
    {
        try {
            $params = [
                'app' => env('APP_ID'),
                'page' => $page,
                'per_page' => $perPage,
                'begin_time' => '-1',
                'object_id' => $search['article_id']
            ];

            if (!empty($search['from'])) {
                $params['begin_time'] = $search['from'];
            }

            if (!empty($search['to'])) {
                $params['end_time'] = $search['to'];
            }

            if (!empty($search['status'])) {
                $params['status'] = $search['status'];
            }

            if (!empty($search['cat'])) {
                $params['term'] = $search['cat'];
            }

            if (!empty($search['sort'])) {
                $params['sort'] = $search['sort'];
            }

            if (!empty($search['user']) && $search['user'] != 'all') {
                $params['id_user'] = $search['user'];
            }

            $url = $this->apiBaseUrl . '/be/get-comment/list-by-object';
            return $this->execGet($url, $params);
        } catch (\Exception $exception) {
            $this->printException($exception);
            $this->writeException($exception);
            return [];
        }
    }

    /**
     * @param $url
     * @param array $params
     * @return array|mixed
     */
    private function execGet($url, $params = [])
    {
        $res = $this->client->get($url . $params);
        $res = $res->getBody()->getContents();
        return empty(\GuzzleHttp\json_decode($res, true)) ? [] : \GuzzleHttp\json_decode($res, true);
    }

    /**
     * @param $status
     * @return string
     */
    private function resolveUrlGetComment($status)
    {
        switch ($status) {
            case 'verify': {
                    return '/be/get-comment/verify';
                }
            case 'publish': {
                    return '/be/get-comment/publish';
                }
            case 'published': {
                    return '/be/get-comment/published';
                }
            case 'bad-comment': {
                    return '/be/get-comment/bad-comment';
                }
            case 'deleted': {
                    return '/be/get-comment/deleted';
                }
            case 'auto-check': {
                    return '/be/get-comment/auto-check';
                }
        }
    }
}
