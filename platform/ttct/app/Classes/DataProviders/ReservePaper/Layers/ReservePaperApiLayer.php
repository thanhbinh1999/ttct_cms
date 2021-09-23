<?php

namespace Kuroneko\Ttct\Classes\DataProviders\ReservePaper\Layers;

use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\DataProvider\Abstracts\BaseLayerAbstract;
use Kuroneko\Ttct\Classes\DataProviders\ReservePaper\Interfaces\ReservePaperLayerInterface;

/**
 * Class ReservePaperApiLayer
 * @package Kuroneko\Ttct\Classes\DataProviders\ReservePaper\Layers
 * @author Giang Nguyen - 黒猫
 */
class ReservePaperApiLayer extends BaseLayerAbstract implements ReservePaperLayerInterface
{
    use CurlTrait;

    /**
     * ReservePaperApiLayer constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return array|mixed
     */
    public function getListReservePaper($page, $perPage, $search = [])
    {
        try {

            $data = [
                'pagination' => [
                    'page' => $page,
                    'perpage' => $perPage
                ],
            ];

            if (!empty($search['sort'])) {
                $data['sort']['field'] = $search['sort']['field'];
                $data['sort']['sort'] = $search['sort']['sort'];
            }

            if (!empty($search['key'])) {
               
                $data['query']['search-key'] = $search['key'];
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

            $url = $this->getBaseUrl() . '/be/reserve-papers/datatable';
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
                'data' => [
                    '1' => $exception->getMessage()
                ]
            ];
           
        }
    }

    /**
     * @param $id
     * @return array|mixed
     */
    public function getDataEdit($id)
    {
        try {
            $url = $this->getBaseUrl() . '/be/reserve-papers/edit/' . $id;
            return $this->execGet($url)['res'];
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return [];
        }
    }
}
