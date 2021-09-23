<?php

namespace Kuroneko\Ttct\Http\Controllers;

use Exception;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Kuroneko\Ttct\Classes\DataProviders\History\ArticleDataProvider;

class ArticleHistoryController  extends  Controller
{
    /**
     * @var  ArticleDataProvider
     */
    private $articleDataProvider;

    public  function __construct()
    {
        $this->articleDataProvider = app()->make(ArticleDataProvider::class);
    }
    /**
     *  return view 
     */

    public function  indexHistory()
    {
        if (!can('article-history')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        $listUrl =  [
            'datatable' =>   route('ttct.historys.article.datatable'),
            'revertDataUrl' => env('API_BASE_URL') . '/be/articles/revert-data-updated/'
        ];
        return view('ttct::historys.index-article-history', compact('listUrl'));
    }

    public function  datatable(Request $request)
    {

        try {

            $pagination =  $request->post('pagination', []);
            $query   = $request->post('query',  []);
            $sort =  $request->post('sort', []);
            $search  = [];
            if (!empty($pagination)) {
                $search['pagination'] = $pagination;
            }
            if (!empty($query)) {
                $search['query'] = $query;
            }
            if (!empty($sort)) {
                $search['sort'] = $sort;
            }
            return $this->articleDataProvider->getListArticleHistory($search);
        } catch (Exception $except) {
            return response()->json([
                'meta' =>  [
                    'page' =>  $pagination['page'],
                    'pages' => 0,
                    'perPage' =>  $pagination['perpage'],
                    'total' => 0,
                ],
                'data' => []
            ], 200);
        }
    }
}
