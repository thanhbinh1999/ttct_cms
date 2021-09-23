<?php


namespace Kuroneko\Ttct\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Ttct\Classes\DataProviders\Article\ArticleDataProvider;
use Kuroneko\Ttct\Classes\Processors\ArticleProcessor;

/**
 * Class ArticleController
 * @package Kuroneko\Ttct\Http\Controllers
 * @author Giang Nguyen
 */
class ArticleController extends Controller
{
    use WriteLogTrait;

    /**
     * @var ArticleDataProvider;
     */
    private $articleDataProvider;

    /**
     * @var ArticleProcessor
     */
    private $articleProcessor;
    private $client;

    /**
     * ArticleController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->articleDataProvider = app()->make(ArticleDataProvider::class);
        $this->articleProcessor = app()->make(ArticleProcessor::class);
        $this->client = new \GuzzleHttp\Client();
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexPublished()
    {
        if (!can('article-published-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Bài viết đã xuất bản');
        $listUrl = [
            'select-category' => route('ttct.categories.select_categories'),
            'select-theme' => route('ttct.tags.select_tag'),
            'datatable' => route('ttct.articles.datatable'),
            'update-priority-one' => route('ttct.articles.update_priority_one') . '/',
            'update-article-editor' => route('ttct.articles.update_article_editor') . '/'
        ];
        return view('ttct::articles.index-published', compact('listUrl'));
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function  indexAuthor()
    {
        set_page_title('Bút danh ');
        return view('ttct::articles.authorIndex');
    }
    public function indexDraft()
    {
        set_page_title('Bài viết nháp');
        $listUrl = [
            'datatable' => route('ttct.articles.datatable_for_draft'),
            'store-transfer' => route('ttct.article_transfer.store_transfer')
        ];
        return view('ttct::articles.index-draft', compact('listUrl'));
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexPending()
    {
        if (!can('article-pending-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Bài viết đang chờ xuất bản');
        $listUrl = [
            'datatable' => env('API_BASE_URL') . '/be/articles/datatable',
            'store-transfer' => env('API_BASE_URL') . '/be/article-transfer/store'
        ];
        return view('ttct::articles.index-pending', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexTakeDown()
    {
        if (!can('article-take-down-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Bài viết đã gỡ');
        $listUrl = [
            'datatable' => route('ttct.articles.datatable'),
            'store-transfer' => route('ttct.article_transfer.store_transfer'),
            'update-article-editor' => route('ttct.articles.update_article_editor') . '/'
        ];
        return view('ttct::articles.index-take-down', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexDelete()
    {
        if (!can('article-delete-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Bài viết đã xóa');
        $listUrl = [
            'datatable' => route('ttct.articles.datatable'),
        ];
        return view('ttct::articles.index-delete', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexArticleForMe()
    {
        set_page_title('Bài viết gửi cho tôi');
        $listUrl = [
            'datatable' => route('ttct.article_transfer.datatable'),
            'store-transfer' => route('ttct.article_transfer.store_transfer'),
            'update-article-transfer-status' => '/article-transfer/update-status/'
        ];
        return view('ttct::articles.index-for-me', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexArticleSendHistory()
    {
        set_page_title('Lịch sử gửi bài');
        $listUrl = [
            'datatable' => route('ttct.article_transfer.datatable')
        ];
        return view('ttct::articles.index-history', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexArticleSendBack()
    {
        set_page_title('Bài viết trả lại');
        $listUrl = [
            'datatable' => env('API_BASE_URL') . '/be/article-transfer/datatable',
            'store-transfer' => route('ttct.article_transfer.store_transfer'),
            'update-article-editor' => route('ttct.articles.update_article_editor') . '/'
        ];
        return view('ttct::articles.index-send-back', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexArticleSendByRole()
    {
        set_page_title('Bài viết gửi theo vai trò');
        $listUrl = [
            'datatable' => route('ttct.article_transfer.datatable'),
            'store-transfer' => route('ttct.article_transfer.store_transfer')
        ];
        return view('ttct::articles.index-send-by-role', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        if (!can('article-create')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Tạo mới bài viết');
        $listUrl = [
            'select-category' => route('ttct.categories.select_categories'),
            'select-tag' => route('ttct.tags.select_tag'),
            'select-theme' => route('ttct.tags.select_tag'),
            'reload' => route('ttct.articles.article_pending_show'),
            'store-tag' => route('ttct.tags.store_tag_for_create_update_article'),
            'store-theme' => route('ttct.tags.store_theme_for_create_update_article'),
            'reload-reserve-papers' => route('ttct.reserve_paper.index'),
            'store' => route('ttct.articles.store'),
            'datatable-resource' => route('ttct.resources.datatable'),
            'url-get-resource-detail' => route('ttct.resources.get_detail') . '/',
            'url-upload-multi' => route('ttct.resources.store_multi'),
            'store-reserve-papers' => route('ttct.reserve_paper.store'),
            'related-select-list' => route('ttct.related.article.select'),
        ];
        return view('ttct::articles.create', compact('listUrl'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        try {
            if (!can('article-update') && !can('article-update-own')) {
                set_page_title('Opps, bạn không có quyền truy cập trang này');
                abort(403);
            } else {
                $client = new \GuzzleHttp\Client();
                $res = $client->get(env('API_BASE_URL') . '/be/articles/get-data-edit/' . $id)->getBody()->getContents();
                $res = json_decode($res, true);

                if ((!can('article-update') && can('article-update-own') && !empty($res['published_at_is_pass']) && $res['status'] == 10) ||
                    (!can('article-update') && can('article-update-own') && !empty($res['published_at_is_pass']) && $res['status'] == 6 && empty($res['editor_id']))
                ) {
                    set_page_title('Opps, bạn không có quyền truy cập trang này');
                    abort(403);
                } else if (!empty($res['editor_id']) && $res['editor_id'] != auth()->user()->id && $res['status'] == 10) {
                    set_page_title('Opps, trang bạn yêu cầu không tồn tại');
                    abort(404);
                }
            }
            $tranId = \request()->get('tran_id', 0);
            $listUrl = [
                'select-category' => route('ttct.categories.select_categories'),
                'select-tag' => route('ttct.tags.select_tag'),
                'datatable-resource' => route('ttct.resources.datatable'),
                'url-upload-multi' => route('ttct.resources.store_multi'),
                'url-get-resource-detail' => route('ttct.resources.get_detail') . '/',
                'select-theme' => route('ttct.tags.select_tag'),
                'store-tag' => route('ttct.tags.store_tag_for_create_update_article'),
                'store-theme' => route('ttct.tags.store_theme_for_create_update_article'),
                'check-time' => route('ttct.articles.check_time'),
                'previous-url' => url()->previous(),
                'update' => route('ttct.articles.update', $id),
                'update-and-publish' => route('ttct.articles.update_and_publish', $id),
                'get-data-edit' => route('ttct.articles.get_data_edit', $id),
                'update-article-transfer-status' => route('ttct.article_transfer.update_article_transfer_status', $tranId),
                'store-transfer' => route('ttct.article_transfer.store_transfer'),
                'get-transfer' => route('ttct.article_transfer.get_transfer', $tranId),
                'related-select-list' => route('ttct.related.article.select'),
                'update-article-resource' => route('ttct.resources.update_article_resource'),
                'select-article-category' => route('ttct.articles.select_article_category'),
            ];
            return view('ttct::articles.edit', compact('listUrl', 'id'));
        } catch (\Exception $exception) {
            set_page_title('Opps, trang bạn yêu cầu không tồn tại');
            abort(404);
        }
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function preview()
    {
        return view('ttct::articles.article-preview');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showSetPriority()
    {
        set_page_title('Biên tập bài nổi bật');
        $listUrl = [
            'select-article' => env('API_BASE_URL') . '/be/articles/select-article-for-set-priority',
            'update-priority' => env('API_BASE_URL') . '/be/articles/update-priority',
            'prepare-data-priority' => env('API_BASE_URL') . '/be/articles/prepare-data-priority'
        ];
        return view('ttct::articles.set-priority', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkTime()
    {
        $time = \request()->get('time');
        if (empty($time)) return response()->json('false');
        return response()->json(Carbon::parse(str_replace('/', '-', $time))->gt(Carbon::now()));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function selectArticleForEditTopical(Request $request)
    {
        try {
            $data = $this->articleDataProvider->selectArticleForEditTopical($request->all());
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getManyArticleForEditTopical(Request $request)
    {
        try {
            $data = $this->articleDataProvider->getManyArticleForEditTopical($request->all());
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatableForDraft(Request $request)
    {
        $query = $request->post('query', []);
        $pagination = $request->post('pagination', []);
        $sort = $request->post('sort', []);
        try {
            $search = [];

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            if (!empty($query['creator'])) {
                $search['creator'] = $query['creator'];
            }

            if (!empty($sort)) {
                $search['sort'] = $sort;
            }

            if (!empty($query['search-key'])) {
                $search['key'] = $query['search-key'];
            }

            $data = $this->articleDataProvider->getListDraft($pagination['page'], $pagination['perpage'], $search);

            foreach ($data['data'] as &$datum) {
                if (!empty($datum['url_pub'])) {
                    $datum['url_pub'] = route('ttct.articles.update_status', $datum['id']);
                }
                if (!empty($datum['url_delete'])) {
                    unset($datum['url_delete']);
                }
            }
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

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable(Request $request)
    {
        $query = $request->post('query', []);
        $pagination = $request->post('pagination', []);
        $sort = $request->post('sort', []);
        try {
            $search = [];

            if (!empty($sort)) {
                $search['sort'] = $sort;
            }

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            if (!empty($query['creator'])) {
                $search['creator'] = $query['creator'];
            }

            if (!empty($sort)) {
                $search['sort'] = $sort;
            }

            if (!empty($query['search-key'])) {
                $search['key'] = $query['search-key'];
            }

            if (!empty($query['category'])) {
                $search['category'] = $query['category'];
            }

            if (!empty($query['theme'])) {
                $search['theme'] = $query['theme'];
            }

            if (!empty($query['from'])) {
                $search['from'] = $query['from'];
            }

            if (!empty($query['to'])) {
                $search['to'] = $query['to'];
            }

            if (!empty($query['author'])) {
                $search['author'] = $query['author'];
            }

            if (!empty($query['search-to-id'])) {
                $search['search-to-id'] = $query['search-to-id'];
            }


            $data = $this->articleDataProvider->getListArticle($pagination['page'], $pagination['perpage'], $search);

            foreach ($data['data'] as &$datum) {
                if (!empty($datum['url_tk'])) {
                    $datum['url_tk'] = route('ttct.articles.update_status', $datum['id']);
                }
                if (!empty($datum['url_restore'])) {
                    $datum['url_restore'] = route('ttct.articles.update_status', $datum['id']);
                }
                if (!empty($datum['url_delete'])) {
                    unset($datum['url_delete']);
                }
            }
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

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            if (!can('article-create')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->articleProcessor->store($request->all());
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {


        try {
            if (!can('article-update') && !can('article-update-own')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->articleProcessor->update($id, $request->all());
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
    public function getDataEdit($id)
    {
        try {
            $data = $this->articleDataProvider->getDataEdit($id);
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAndPublish($id, Request $request)
    {
        try {
            if (!can('article-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->articleProcessor->updateAndPublish($id, $request->all());
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus($id, Request $request)
    {
        try {
            if (!can('article-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->articleProcessor->updateStatus($id, $request->all());
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateArticleEditor($id, Request $request)
    {
        try {
            if (!can('article-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->articleProcessor->updateArticleEditor($id, $request->all());
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updatePriorityOne($id, Request $request)
    {
        try {
            $data = $this->articleProcessor->updatePriorityOne($id, $request->all());
            return response()->json($data['res'], $data['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }


    public function showList()
    {
        try {
            /*if(!can("delete-articles-handling")){
            return response()->json([
               'message' => 'Không thể truy cập chức năng này'
            ],403); 
         }*/
            return view("ttct::articles.index-delete-article-handling");
        } catch (Exception $e) {
        }
    }

    /**
     * @param $id
     * @return json
     */

    public function deletePostPermission()
    {
        try {
            $reponse  = $this->client->request(
                "POST",
                ENV('API_BASE_URL') . "/be/articles/delete-post-permission",
                ['form_params' => request()->all()]
            );
            if ($reponse->getStatusCode() == 200) {
                $data = $reponse->getBody();
                return $data;
            } else {
                return response()->json(['error' => 'Lỗi hệ thống vui lòng thử lại']);
            }
        } catch (ClientException $exception) {
            return response()->json([
                'error' => 'Lỗi hệ thống vui lòng thử lại'
            ]);
        }
    }

    /**
     * @param id,page,q
     * @return json
     */
    public function showRelatedArticle()
    {
        $q = request()->post('q', []);
        $page = request()->post('page', 1);
        $per_page = request()->post('per_page', 10);
        $search = [];

        try {
            $search['key'] =  $q;
            return  $data = $this->articleDataProvider->showRelatedArticle($page, $per_page, $search);
        } catch (ClientException $exception) {
            return  response()->json([
                'error' => 'Lỗi hệ thống vui lòng thử lại'
            ]);
        }
    }

    /**
     * @param q:string,per_page:number
     * @return json 
     */

    public function selectAricleCategory()
    {
        $q = request()->post('q', []);
        $page = request()->post('page', 1);
        $per_page = request()->post('per_page', 10);
        $search = [];

        try {
            $search['key'] =  $q;
            return  $data = $this->articleDataProvider->selectArticleCategory($page, $per_page, $search);
        } catch (ClientException $exception) {
            return  response()->json([
                'status' => 500,
                'message' => 'Lỗi hệ thống vui lòng thử lại',
                'data' => []
            ]);
        }
    }

    public function  updateArticleCategoryPublished($id, Request $request)
    {

        try {

            $data = $this->articleProcessor->updateArticleCategoryPublished($id, $request->all());
            return response()->json($data['res'], $data['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([

                'error' => $exception->getMessage()
            ], 500);
        }
    }


    /**
     *  @param   id|int , themes|array
     *  @return json
     */

    public function  updateArticleThemePublished($id,  Request  $request)
    {


        try {

            $data = $this->articleProcessor->updateArticleThemePublished($id, $request->all());
            return response()->json($data['res'], $data['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'error' => $exception->getMessage()
            ], 500);
        }
    }
}
