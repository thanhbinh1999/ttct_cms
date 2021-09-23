<?php

namespace Kuroneko\Ttct\Classes\DataProviders\History;

use Kuroneko\Core\Traits\CurlTrait;

class ArticleDataProvider
{
    use CurlTrait;
    public function __construct()
    {
        $this->clientInit();
    }
    /**
     * @param search:array
     * @return json   
     */
    public function  getListArticleHistory($search)
    {
        try {
            $url  =  $this->getBaseUrl() . '/be/logs/get-list-article-log';
            return $this->execPost($url, $search)['res'];
        } catch (\Exception $exception) {
            return [
                'meta' => [
                    'page' => 1,
                    'pages' => 1,
                    'perpage' => 100,
                    'total' => 0
                ],
                'data' => $exception->getMessage()
            ];
        }
    }
}
