<?php


namespace Kuroneko\Ttct\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Ttct\Classes\DataProviders\ArticleTransfer\ArticleTransferDataProvider;
use Kuroneko\Ttct\Classes\Processors\ArticleTransferProcessor;

/**
 * Class ArticleTransferController
 * @package Kuroneko\Ttct\Http\Controllers
 * @author Giang Nguyen
 */
class ArticleTransferController extends Controller
{
    use WriteLogTrait;

    /**
     * @var ArticleTransferDataProvider
     */
    private $articleTransferProvider;

    /**
     * @var ArticleTransferProcessor
     */
    private $articleTransferProcessor;

    /**
     * ArticleTransferController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->articleTransferProvider = app()->make(ArticleTransferDataProvider::class);
        $this->articleTransferProcessor = app()->make(ArticleTransferProcessor::class);
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateArticleTransferStatus($id, Request $request)
    {
        try {
            $data = $this->articleTransferProcessor->updateArticleTransferStatus($id, $request->all());
            return response()->json($data['res'], $data['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTransfer(Request $request)
    {
        try {
            $data = $this->articleTransferProcessor->storeTransfer($request->all());
            return response()->json($data['res'], $data['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTransfer($id)
    {
        try {
            $data = $this->articleTransferProvider->getTransfer($id);
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    public function datatable(Request $request)
    {
        $query = $request->get('query');
        $pagination = $request->get('pagination', [
            'page' => 1,
            'perpage' => 10
        ]);
        $sort = $request->get('sort');
        try {
            $search = [];

            if (!empty($sort['sort']) && !empty($sort['field'])) {
                $search['sort'] = [
                    'field' => $sort['field'],
                    'type' => $sort['sort']
                ];
            }

            if (!empty($query['search-key'])) {
                $search['key'] = $query['search-key'];
            }

            if (isset($query['from_user'])) {
                $search['from_user'] = $query['from_user'];
            }

            if (isset($query['to_user'])) {
                $search['to_user'] = $query['to_user'];
            }

            if (!empty($query['type'])) {
                $search['type'] = $query['type'];
            }

            if (!empty($query['sb_or_fw'])) {
                $search['sb_or_fw'] = $query['sb_or_fw'];
            }

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            $data = $this->articleTransferProvider->getListTransfer(
                $pagination['page'],
                $pagination['perpage'],
                $search
            );
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'meta' => [
                    'page' => $pagination['page'],
                    'pages' => 4,
                    'perpage' => $pagination['perpage'],
                    'total' => 0
                ],
                'data' => []
            ]);
        }
    }
}
