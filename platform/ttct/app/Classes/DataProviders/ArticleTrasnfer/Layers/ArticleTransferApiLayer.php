<?php

namespace Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\Layers;

use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\Interfaces\ArticleTransferLayerInterface;

/**
 * Class ArticleTransferApiLayer
 * @package Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\Layers
 * @author Giang Nguyen - 黒猫
 */
class ArticleTransferApiLayer extends BaseLayerAbstract implements ArticleTransferLayerInterface
{
    use CurlTrait;

    /**
     * ArticleTransferApiLayer constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getTransfer($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/article-transfer/get-transfer/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
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
    public function getListTransfer($page, $perPage, $search = [])
    {
        try {
            $data = [
                [
                    'name' => 'pagination[page]',
                    'contents' => $page
                ],
                [
                    'name' => 'pagination[perpage]',
                    'contents' => $perPage
                ]
            ];

            if (!empty($search['sort'])) {
                $data[] = [
                    'name' => 'sort[field]',
                    'content' => $search['sort']['field']
                ];
                $data[] = [
                    'name' => 'sort[type]',
                    'content' => $search['sort']['type']
                ];
            }

            if (!empty($search['key'])) {
                $data[] = [
                    'name' => 'query[search-key]',
                    'contents' => $search['key']
                ];
            }

            if (isset($search['from_user'])) {
                $data[] = [
                    'name' => 'query[from_user]',
                    'contents' => $search['from_user']
                ];
            }

            if (isset($search['to_user'])) {
                $data[] = [
                    'name' => 'query[to_user]',
                    'contents' => $search['to_user']
                ];
            }

            if (!empty($search['type'])) {
                $data[] = [
                    'name' => 'query[type]',
                    'contents' => $search['type']
                ];
            }

            if (!empty($search['sb_or_fw'])) {
                $data[] = [
                    'name' => 'query[sb_or_fw]',
                    'contents' => $search['sb_or_fw']
                ];
            }

            if (!empty($search['status'])) {
                if (is_array($search['status'])) {
                    foreach ($search['status'] as $status) {
                        $data[] = [
                            'name' => 'query[status][]',
                            'contents' => $status
                        ];
                    }
                } else {
                    $data[] = [
                        'name' => 'query[status]',
                        'contents' => $search['status']
                    ];
                }
            }

            $url = $this->getBaseUrl() . '/be/article-transfer/datatable';
            return $this->execPostFile($url, $data)['res'];
        } catch
        (\Exception $exception) {
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
}
