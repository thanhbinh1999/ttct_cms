<?php


namespace Kuroneko\Comment\Http\Controllers;


use App\Http\Controllers\Controller;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Kuroneko\Comment\Classes\Constants\CommentConstant;
use Kuroneko\Comment\Classes\DataProviders\BlackKey\BlackKeyDataProvider;
use Kuroneko\Comment\Classes\DataProviders\Comment\CommentDataProvider;
use Kuroneko\Comment\Classes\DataProviders\Sticker\StickerDataProvider;
use Kuroneko\Comment\Classes\Processors\CommentProcessor;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\User\Classes\DataProviders\User\UserDataProvider;

/**
 * Class CommentController
 * @package Kuroneko\Comment\Http\Controllers
 * @author GIang Nguyen - 黒猫
 */
class CommentController extends Controller
{
    use WriteLogTrait;
    /**
     * @var CommentDataProvider
     */
    private $commentDataProvider;

    /**
     * @var StickerDataProvider
     */
    private $stickerDataProvider;

    /**
     * @var CommentProcessor
     */
    private $commentProcessor;

    /**
     * @var UserDataProvider
     */
    private $userDataProvider;

    /**
     * @var BlackKeyDataProvider
     */
    private $blackKeyDataProvider;

    /**
     * CommentController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->commentDataProvider = app()->make(CommentDataProvider::class);
        $this->stickerDataProvider = app()->make(StickerDataProvider::class);
        $this->commentProcessor = app()->make(CommentProcessor::class);
        $this->userDataProvider = app()->make(UserDataProvider::class);
        $this->blackKeyDataProvider = app()->make(BlackKeyDataProvider::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showAutoCheck()
    {
        $this->checkPermission('comment-auto-check-view');

        set_page_title('Bình luận vi phạm');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories',
        ];

        return view('comment::comments.auto-check', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showVerify()
    {
        $this->checkPermission('comment-verify-view');
        set_page_title('Bình luận chờ duyệt ');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories',
        ];

        return view('comment::comments.verify', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showPublish()
    {
        $this->checkPermission('comment-publish-view');

        set_page_title('Bình luận chờ xuất bản');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories',
        ];
        return view('comment::comments.publish', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showPublished()
    {
        $this->checkPermission('comment-published-view');

        set_page_title('Bình luận đã xuất bản');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories',
        ];
        return view('comment::comments.published', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showDeleted()
    {
        $this->checkPermission('comment-deleted-view');

        set_page_title('Bình luận đã ');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories',
        ];
        return view('comment::comments.deleted', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showReported()
    {
        $this->checkPermission('comment-reported-view');

        set_page_title('BÌnh luận bị báo cáo');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories',
        ];
        return view('comment::comments.comment-reported', compact('listUrl'));
    }

    /**
     * @param $type
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showReportTotalComment()
    {
        set_page_title('Thống kê tổng lượt bình luận');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories',
        ];

        return view('comment::comments.report.total-comment', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showReportCountCommentBeProcessedByUserCms()
    {
        set_page_title('Thống kê bình luận được xử lý bởi người dùng');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories'
        ];
        return view('comment::comments.report.count-comment-be-processed-by-user-cms', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showReportCountCommentByListCat()
    {
        set_page_title('Thống kê bình luận theo chuyên mục');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories'
        ];
        return view('comment::comments.report.count-comment-by-list-cat', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showReportCountCommentByAuthor()
    {
        set_page_title('Thống kê bình luận theo tác giả');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories'
        ];
        return view('comment::comments.report.most-comment-by-author', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showReportMostCommentPublished()
    {
        set_page_title('Bài viết có số bình luận xuất bản nhiều nhất');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories'
        ];
        return view('comment::comments.report.most-comment-published', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showReportMostComment()
    {
        set_page_title('Bài viết có số bình luận nhiều nhất');
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories'
        ];
        return view('comment::comments.report.most-comment', compact('listUrl'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showCommentByArticle($id)
    {
        $listUrl = [
            'select-category' => env('API_BASE_URL') . '/be/categories/select-categories'
        ];
        $article = $this->getListArticleByListId([$id]);
        if (!empty($article['data'])) {
            $article = $article['data'][0];
            set_page_title($article['title']);
            return view('comment::comments.by-article', compact('id', 'listUrl', 'article'));
        } else {
            set_page_title('Opps, trang bạn yêu cầu không tồn tại');
            abort(404);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable(Request $request)
    {
        $query = $request->post('query');
        $pagination = $request->post('pagination');
        try {
            $search = [
                'status' => $query['status']
            ];

            $this->resolveTime($search, $query);

            if (!empty($query['category'])) {
                $search['category'] = $query['category'];
            }

            if (!empty($query['sort'])) {
                $search['sort'] = $query['sort'];
            }

            if (!empty($query['author'])) {
                $search['author'] = $query['author'];
            }

            if (!empty($query['user'])) {
                $search['user'] = $query['user'];
            }

            $data = $this->commentDataProvider->getListComment(
                $pagination['page'],
                $pagination['perpage'],
                $search
            );
            

            $stickerIds = [];

            $blackKey = [];
            if ($search['status'] == 'auto-check') {
                $blackKey = $this->blackKeyDataProvider->getListBlackKeyRaw();
            }

            $articlesIds = collect($data['data'])->map(function ($item) {
                return $item['object_id'];
            })->unique()->toArray();

            $articles = $this->getListArticleByListId(array_values($articlesIds));
            $articles = collect(empty($articles['data']) ? [] : $articles['data']);

            foreach ($data['data'] as &$datum) {
                $article = $articles->first(function ($item) use ($datum) {
                    return $item['id'] == $datum['object_id'];
                });

                if (!empty($article)) {
                    $isTopical = collect($article['categories'])->first(function ($item) {
                        return $item['type'] == 2;
                    });

                    $datum['article_link'] = $this->resolveArticleLink($isTopical, $article);
                }

                if (!empty($datum['sticker_id'])) {
                    $stickerIds[] = $datum['sticker_id'];
                }
                $datum['url_get_log'] = route('comments.get_log_comment', $datum['id']);
                $datum['url_view_article_comment'] = route('comments.show_comment_by_article', $datum['object_id']);
                $datum['report_delete'] = route('comments.update_report_comment');
                $datum['report_ignore'] = route('comments.update_report_comment');
                if (
                    $datum['status'] == CommentConstant::STATUS_PENDING ||
                    $datum['status'] == CommentConstant::STATUS_VERIFIED ||
                    $datum['status'] == CommentConstant::STATUS_PUBLISHED
                ) {
                    $datum['url_delete'] = route('comments.delete');
                    $datum['url_verify'] = route('comments.verify');
                    $datum['url_publish'] = route('comments.publish');
                    $datum['url_send_back'] = route('comments.send_back');
                }

                if ($datum['status'] == CommentConstant::STATUS_PUBLISHED) {
                    $datum['url_update'] = route('comments.update_comment_and_author');
                }
               
                if (
                    $datum['status'] != CommentConstant::STATUS_PENDING &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_WORD_DANGER &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_WORD_CAREFUL &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_UNSIGN &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_HAS_LINK &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_HAS_PHONE &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_SHORT_SENTENCE &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_SAME_CMT &&
                    can('comment-send-back')
                ) {
                   
                }

                if ($datum['status'] == CommentConstant::STATUS_DELETED && can('comment-restore')) {
                    $datum['url_restore'] = route('comments.restore');
                }

                if (!empty($datum['reports'])) {
                    if (can('comment-report-delete')) {
                        $datum['report_delete'] = route('comments.update_report_comment');
                    }

                    if (can('comment-report-ignore')) {
                        $datum['report_ignore'] = route('comments.update_report_comment');
                    }
                }

                if (!empty($datum['user_id'])) {
                    $user = $this->userDataProvider->findById($datum['user_id']);
                    $datum['actor'] = empty($user) ? null : $user->username;
                }

               // $datum['created_at'] = date('d/m/Y H:i', $datum['created_at']);
               // $datum['updated_at'] = date('d/m/Y H:i', $datum['updated_at']);

                if ($search['status'] == 'auto-check') {
                    if (can('comment-restore')) {
                        $datum['url_restore'] = route('comments.restore');
                    }
                    $tmp = $this->highLightBlackKey($datum['content'], $datum['author_name'], $blackKey);
                    $datum['content_detected'] = $tmp['content'];
                    $datum['author_detected'] = $tmp['author'];
                }
            }
            $stickers = $this->stickerDataProvider->getListStickerByListId($stickerIds);
            foreach ($stickers as $sticker) {
                foreach ($data['data'] as &$datum) {
                    if ($datum['sticker_id'] == $sticker['id']) {
                        $datum['sticker'] = $sticker;
                        break;
                    }
                }
            }

            $meta = [
                'page' => $pagination['page'],
                'pages' => $data['total_pages'],
                'perpage' => $pagination['perpage'],
                'total' => $data['total_items']
            ];

            return response()->json([
                'meta' => $meta,
                'data' => $data['data'],
            ]);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => $pagination['page'],
                'pages' => 0,
                'perpage' => $pagination['perpage'],
                'total' => 0
            ];
            return response()->json([
                'meta' => $meta,
                'data' => [],
                'error' => $exception->getMessage()
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function commentByArticle(Request $request)
    {
        $query = $request->post('query');
        $pagination = $request->post('pagination');
        try {
            $search = [
                'article_id' => $query['article_id'],
                'status' => $query['status']
            ];

            $this->resolveTime($search, $query);

            if (!empty($query['category'])) {
                $search['category'] = $query['category'];
            }

            if (!empty($query['sort'])) {
                $search['sort'] = $query['sort'];
            }

            if (!empty($query['author'])) {
                $search['author'] = $query['author'];
            }

            if (!empty($query['user'])) {
                $search['user'] = $query['user'];
            }

            $data = $this->commentDataProvider->getCommentByArticle($pagination['page'], $pagination['perpage'], $search);

            $stickerIds = [];

            $blackKey = [];
            if ($search['status'] == 'auto-check') {
                $blackKey = $this->blackKeyDataProvider->getListBlackKeyRaw();
            }

            $articlesIds = collect($data['data'])->map(function ($item) {
                return $item['object_id'];
            })->unique();

            $articles = $this->getListArticleByListId($articlesIds);
            $articles = collect(empty($articles['data']) ? [] : $articles['data']);

            foreach ($data['data'] as &$datum) {
                $article = $articles->first(function ($item) use ($datum) {
                    return $item['id'] == $datum['object_id'];
                });

                if (!empty($article)) {
                    $isTopical = collect($article['categories'])->first(function ($item) {
                        return $item['type'] == 2;
                    });

                    $datum['article_link'] = $this->resolveArticleLink($isTopical, $article);
                }

                if (!empty($datum['sticker_id'])) {
                    $stickerIds[] = $datum['sticker_id'];
                }
                $datum['url_get_log'] = route('comments.get_log_comment', $datum['id']);

                if (
                    $datum['status'] == CommentConstant::STATUS_PENDING ||
                    $datum['status'] == CommentConstant::STATUS_VERIFIED ||
                    $datum['status'] == CommentConstant::STATUS_PUBLISHED
                ) {
                    $datum['url_delete'] = route('comments.delete');
                }

                if ($datum['status'] == CommentConstant::STATUS_PUBLISHED) {
                    $datum['url_update'] = route('comments.update_comment_and_author');
                }

                if ($datum['status'] == CommentConstant::STATUS_PENDING && can('comment-verify')) {
                    $datum['url_verify'] = route('comments.verify');
                }

                if ($datum['status'] == CommentConstant::STATUS_VERIFIED && can('comment-publish')) {
                    $datum['url_publish'] = route('comments.publish');
                }

                if (
                    $datum['status'] != CommentConstant::STATUS_PENDING &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_WORD_DANGER &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_WORD_CAREFUL &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_UNSIGN &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_HAS_LINK &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_HAS_PHONE &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_SHORT_SENTENCE &&
                    $datum['status'] != CommentConstant::STATUS_FILTER_SAME_CMT &&
                    can('comment-send-back')
                ) {
                    $datum['url_send_back'] = route('comments.send_back');
                }

                if ($datum['status'] == CommentConstant::STATUS_DELETED && can('comment-restore')) {
                    $datum['url_restore'] = route('comments.restore');
                }

                if (!empty($datum['reports'])) {
                    if (can('comment-report-delete')) {
                        $datum['report_delete'] = route('comments.update_report_comment');
                    }

                    if (can('comment-report-ignore')) {
                        $datum['report_ignore'] = route('comments.update_report_comment');
                    }
                }

                if (!empty($datum['user_id'])) {
                    $user = $this->userDataProvider->findById($datum['user_id']);
                    $datum['actor'] = empty($user) ? null : $user->username;
                }

                $datum['created_at'] = date('d/m/Y H:i', $datum['created_at']);
                $datum['updated_at'] = date('d/m/Y H:i', $datum['updated_at']);

                if ($search['status'] == 'auto-check') {
                    if (can('comment-restore')) {
                        $datum['url_restore'] = route('comments.restore');
                    }
                    $tmp = $this->highLightBlackKey($datum['content'], $datum['author_name'], $blackKey);
                    $datum['content_detected'] = $tmp['content'];
                    $datum['author_detected'] = $tmp['author'];
                }
            }

            $stickers = $this->stickerDataProvider->getListStickerByListId($stickerIds);

            foreach ($stickers as $sticker) {
                foreach ($data['data'] as &$datum) {
                    if ($datum['sticker_id'] == $sticker['id']) {
                        $datum['sticker'] = $sticker;
                        break;
                    }
                }
            }

            //            $meta = [
            //                'page' => $pagination['page'],
            //                'pages' => 4,
            //                'perpage' => $pagination['perpage'],
            //                'total' => 0
            //            ];

            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => 0
            ];
            return response()->json([
                'meta' => $meta,
                'data' => [],
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function mostCountComment(Request $request)
    {
        $query = $request->post('query', []);
        $pagination = $request->post('pagination', ['page' => 1, 'perpage' => 10]);
        try {
            //get most count comment
            $search = [];

            $this->resolveTime($search, $query);

            if (!empty($query['sort'])) {
                $search['status_sort'] = $query['sort'];
            }

            if (!empty($query['category'])) {
                $search['cat'] = $query['category'];
            }

            $data = $this->commentDataProvider->getMostCountComment($pagination['page'], $pagination['perpage'], $search);
            $total = $data['total_items'];
            //get most count comment

            $statusGet = empty($query['status_get']) ? [] : json_decode($query['status_get'], true);

            $ids = collect($data['data'])->map(function ($item) {
                return $item['object_id'];
            })->toArray();

            $dataCountComment = $this->commentDataProvider->getCountCommentOfListArticleByStatus($ids, $statusGet, $search);

            $dataArticle = $this->getListArticleByListId($ids);
            if (!empty($dataArticle['data'])) {
                $data = collect($dataCountComment)->map(function ($item) use ($dataArticle, $search, $statusGet) {
                    $article = collect($dataArticle['data'])->first(function ($a) use ($item) {
                        return $a['id'] == $item['target_id'];
                    });

                    $isTopical = collect($article['categories'])->first(function ($item) {
                        return $item['type'] == 2;
                    });

                    if (!empty($statusGet)) {
                        $tmp = [
                            'article_id' => $article['id'],
                            'article_title' => $article['title'],
                            'article_link' => $this->resolveArticleLink($isTopical, $article)
                        ];
                        foreach ($statusGet as $dataUm) {
                            $tmp[$dataUm] = $item['count'][$dataUm];
                        }
                        return $tmp;
                    } else {
                        return [
                            'article_id' => $article['id'],
                            'article_title' => $article['title'],
                            'total' => $item['count']['total'],
                            'article_link' => $this->resolveArticleLink($isTopical, $article)
                        ];
                    }
                });
                $meta = [
                    'page' => $pagination['page'],
                    'pages' => 4,
                    'perpage' => $pagination['perpage'],
                    'total' => $total
                ];
                return response()->json([
                    'meta' => $meta,
                    'data' => $data,
                ]);
            } else {
                throw  new \Exception();
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => 0
            ];
            return response()->json([
                'meta' => $meta,
                'data' => [],
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCountCommentBeProcessedByUserCmsOfListUserByListStatus(Request $request)
    {
        try {
            $status = [
                'comment-delete',
                'comment-publish',
                'comment-verify'
            ];

            $users = $this->userDataProvider->all()->filter(function ($user) use ($status) {
                $permissions = $user->getAllPermissions()->pluck('name');
                $contain = false;
                foreach ($status as $item) {
                    if ($permissions->contains($item)) {
                        $contain = true;
                        break;
                    }
                }
                return $contain;
            })->pluck('username', 'id')->all();


            $query = $request->post('query', []);

            $search = [];

            $this->resolveTime($search, $query);

            if (!empty($query['sort'])) {
                $search['sort'] = $query['sort'];
            }

            if (!empty($query['category'])) {
                $search['cat'] = $query['category'];
            }

            $data = $this->commentDataProvider->getCountCommentBeProcessedByUserCmsOfListUserByListStatus(array_keys($users), [], $search);

            if (!empty($data)) {
                $data = collect($data)->map(function ($item) use ($users) {
                    $item['username'] = $users[$item['user_id']];
                    $item['total'] = $item['verify']['count']['verified'] + $item['delete']['count']['deleted'] + $item['publish']['count']['published'];
                    return $item;
                })->toArray();

                uasort($data, function ($a, $b) {
                    if (intval($a['total']) == intval($b['total'])) return 0;
                    return (intval($a['total']) < intval($b['total'])) ? 1 : -1;
                });

                $meta = [
                    'page' => 1,
                    'pages' => 4,
                    'perpage' => 100,
                    'total' => count($data)
                ];

                return response()->json([
                    'meta' => $meta,
                    'data' => array_values($data),
                ]);
            } else {
                throw new \Exception();
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => 1,
                'pages' => 4,
                'perpage' => 100,
                'total' => 0
            ];

            return response()->json([
                'meta' => $meta,
                'data' => [],
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function countCommentOfListCatByListStatus(Request $request)
    {
        $query = $request->post('query', []);

        try {

            $search = [];

            $this->resolveTime($search, $query);

            $client = new Client();
            $res = $client->post(env('API_BASE_URL') . '/be/categories/datatable', [
                'form_params' => [
                    'pagination' => [
                        'page' => 1,
                        'perpage' => 10000
                    ],
                    'query' => [
                        'type' => 1
                    ]
                ]
            ]);

            $cats = json_decode($res->getBody()->getContents(), true);
            if (!empty($cats) && !empty($cats['data'])) {
                $cats = collect($cats['data'])->map(function ($cat) {
                    return [
                        'id' => $cat['id'],
                        'name' => $cat['name']
                    ];
                });

                $data = $this->commentDataProvider->getCountCommentOfListCatByListStatus($cats->pluck('id'), [], $search);

                $data = collect($data)->map(function ($item, $index) use ($cats) {
                    $item['name'] = $cats->get($index)['name'];
                    $item['total'] = intval($item['count']['verified']) + intval($item['count']['deleted']) + intval($item['count']['published']);
                    return $item;
                })->toArray();

                uasort($data, function ($a, $b) {
                    if (intval($a['total']) == intval($b['total'])) return 0;
                    return (intval($a['total']) < intval($b['total'])) ? 1 : -1;
                });

                $meta = [
                    'page' => 1,
                    'pages' => 4,
                    'perpage' => 100,
                    'total' => count($data)
                ];

                return response()->json([
                    'meta' => $meta,
                    'data' => $data,
                ]);
            } else {
                throw new \Exception();
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => 1,
                'pages' => 4,
                'perpage' => 100,
                'total' => 0
            ];

            return response()->json([
                'meta' => $meta,
                'data' => [],
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function countCommentByAuthor(Request $request)
    {
        $query = $request->post('query', []);
        $pagination = $request->post('pagination', ['page' => 1, 'perpage' => 10]);
        try {
            $search = [];
            $this->resolveTime($search, $query);

            if (!empty($query['category'])) {
                $search['cat'] = $query['category'];
            }

            $data = $this->commentDataProvider->getCountCommentByAuthor($pagination['page'], $pagination['perpage'], $search);
            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => $data['total_items']
            ];
            return response()->json([
                'meta' => $meta,
                'data' => $data['data'],
            ]);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => $data['total_items']
            ];
            return response()->json([
                'meta' => $meta,
                'data' => [],
            ]);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLogComment($id)
    {
        if (!can('comment-view-log')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $logs = $this->commentDataProvider->getLogComment($id);
        foreach ($logs['data'] as &$log) {
            $user = $this->userDataProvider->findById($log['user_id']);
            if (!empty($user)) {
                $log['username'] = $user->username;
            } else {
                $log['username'] = 'N/A';
            }
            $log['created_at'] = date('d/m/Y H:i', $log['created_at']);
        }
        return response()->json($logs);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCountComment(Request $request)
    {
        try {
            $search = [
                'status' => [
                    'f_word_danger',
                    'f_word_careful',
                    'f_same_comment',
                    'f_unsign',
                    'f_short_sentence',
                    'f_has_phone',
                    'f_has_link',
                ]
            ];

            $status = json_decode($request->post('status', '[]'));
            $search['status'] = empty($status) ? $search['status'] : $status;

            $from = $request->post('from', null);
            $to = $request->post('to', null);

            if (!empty($from) && empty($to)) {
                $search['from'] = Carbon::parse(str_replace('/', '-', $from))->startOfDay()->timestamp;
                $search['to'] = Carbon::now()->timestamp;
            } else if (empty($from) && !empty($to)) {
                $to = Carbon::parse(str_replace('/', '-', $to));
                $search['from'] = $to->startOfDay()->timestamp;
                $search['to'] = $to->isCurrentDay() ? Carbon::now()->timestamp : $to->endOfDay()->timestamp;
            } else if (!empty($from) && !empty($to)) {
                $search['from'] = Carbon::parse(str_replace('/', '-', $from))->startOfDay()->timestamp;
                $search['to'] = Carbon::parse(str_replace('/', '-', $to))->endOfDay()->timestamp;
            } else {
                $search['from'] = null;
                $search['to'] = null;
            }

            $tmp = $this->commentDataProvider->getListCountComment($search);

            $total = $tmp['total'];
            unset($tmp['total']);

            $count = [];

            foreach ($tmp as $key => $value) {
                if ($key != 'total') {
                    $count[$key] = $total > 0 ? intval(floatval(intval($value) / intval($total)) * 100) : 0;
                }
            }

            return response()->json([
                'count' => $tmp,
                'percent' => $count,
                'total' => $total
            ]);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(Request $request)
    {


        if (!can('comment-verify')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = json_decode($request->post('data', '[]'), true);
        if (!empty($data)) {
            foreach ($data as &$datum) {
                $datum['user_ip'] = $request->ip();
                $datum['status'] =  CommentConstant::STATUS_PENDING;
                $datum['app'] = env('APP_ID');
            }

            if ($this->commentProcessor->verifyComment($data) == "true") {
                return response()->json([
                    'message' => 'Verify comment thành công'
                ]);
            } else {
                return response()->json([
                    'message' => 'Verify comment thất bại'
                ]);
            }
        }
        return response()->json([
            'message' => 'Oop, có lỗi xảy ra, thử lại sau'
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function publish(Request $request)
    {
        if (!can('comment-publish')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = json_decode($request->post('data', '[]'), true);
        if (!empty($data)) {
            foreach ($data as &$datum) {
                $datum['user_ip'] = $request->ip();
                $datum['status'] =  CommentConstant::STATUS_PUBLISHED;
                $datum['app'] = env('APP_ID');
            }
            
            if ($this->commentProcessor->publishComment($data) == "true") {
                return response()->json([
                    'message' => 'Xuất bản comment thành công'
                ]);
            }else{

                return response()->json([
                    'message' => 'Oop, có lỗi xảy ra, thử lại sau'
                ], 500);
            }
        }
        return response()->json([
            'message' => 'Oop, có lỗi xảy ra, thử lại sau'
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendBack(Request $request)
    {
        if (!can('comment-send-back')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = json_decode($request->post('data', '[]'), true);
        if (!empty($data)) {
            foreach ($data as &$datum) {
                $datum['user_ip'] = $request->ip();
                $datum['status'] = CommentConstant::STATUS_PENDING;
                $datum['app'] = env('APP_ID');
            }
           
            if ($this->commentProcessor->sendBackComment($data)== "true") {
                return response()->json([
                    'message' => 'Send back comment thành công'
                ]);
            }else{
                return response()->json([
                    'message' => 'Oop, có lỗi xảy ra, thử lại sau'
                ]);
            }
        }
        return response()->json([
            'message' => 'Oop, có lỗi xảy ra, thử lại sau'
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        if (!can('comment-delete')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = json_decode($request->post('data', '[]'), true);

        if (!empty($data)) {
            foreach ($data as &$datum) {
                $datum['user_ip'] = $request->ip();
                $datum['status']  =   CommentConstant::STATUS_DELETED;
                $datum['app'] = env('APP_ID');
            }

            if ($this->commentProcessor->deleteComment($data)== "true") {
                return response()->json([
                    'message' => 'Delete comment thành công'
                ]);
            } else {
                return response()->json([
                    'message' => 'Oop, có lỗi xảy ra, thử lại sau'
                ], 500);
            }
        }
        return response()->json([
            'message' => 'Oop, có lỗi xảy ra, thử lại sau'
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore(Request $request)
    {
        if (!can('comment-restore')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = json_decode($request->post('data', '[]'), true);

        if (!empty($data)) {
            foreach ($data as &$datum) {
                $datum['user_ip'] = $request->ip();
                $datum['status'] = CommentConstant::STATUS_PENDING;
                $datum['app'] = env('APP_ID');
            }
            return $this->commentProcessor->restoreComment($data);
            if ($this->commentProcessor->restoreComment($data)) {
                return response()->json([
                    'message' => 'Khôi phục comment thành công'
                ]);
            }
        }
        return response()->json([
            'message' => 'Oop, có lỗi xảy ra, thử lại sau'
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateContentAndAuthor(Request $request)
    {
        if (!can('comment-update-content-and-author')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = json_decode($request->post('data', '[]'), true);
        if (!empty($data)) {
            foreach ($data as &$datum) {
                $datum['user_ip'] = $request->ip();
                $datum['status'] = CommentConstant::STATUS_PUBLISHED;
                $datum['app'] = env('APP_ID');
            }
            
            if ($this->commentProcessor->updateContentAndAuthorComment($data)== "true") {
                return response()->json([
                    'message' => 'Cập nhật comment thành công'
                ]);
            }else{
                return response()->json([
                    'message' => 'Oop, có lỗi xảy ra, thử lại sau'
                ], 500);
            }
        }
        return response()->json([
            'message' => 'Oop, có lỗi xảy ra, thử lại sau'
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateReportComment(Request $request)
    {
        if (!can('comment-report-delete') && !can('comment-report-ignore')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = json_decode($request->post('data', '[]'), true);

        if (!empty($data)) {
            foreach ($data as &$datum) {
                $datum['app'] = env('APP_ID');
                $datum['user_ip'] = $request->ip();
            }
            if ($this->commentProcessor->updateReportComment($data)) {
                return response()->json([
                    'message' => 'Thực hiện thành công'
                ]);
            }
        }
        return response()->json([
            'message' => 'Oop, có lỗi xảy ra, thử lại sau'
        ], 500);
    }

    /**
     * @param $content
     * @param $authorName
     * @param $blackKeys
     * @return array
     */
    private function highLightBlackKey($content, $authorName, $blackKeys)
    {
        if (!empty($blackKeys)) {
            $step = 0;
            $newContent = $content;
            $newAuthorName = $authorName;
            while ($step < count($blackKeys)) {
                $tmp = preg_replace('/[\/]/', '\/', mb_strtolower($blackKeys[$step], 'UTF-8'));
                $regex = "/\w*?$tmp\w*/i";
                if (preg_match($regex, mb_strtolower($content, 'UTF-8'))) {
                    $newContent = preg_replace($regex, "<span style='background-color: #aafffe'>$0</span>", mb_strtolower($content, 'UTF-8'));
                    break;
                }
                $step++;
            }

            while ($step < count($blackKeys)) {
                $tmp = preg_replace('/[\/]/', '\/', mb_strtolower($blackKeys[$step], 'UTF-8'));
                $regex = "/\w*?$tmp\w*/i";
                if (preg_match($regex, mb_strtolower($authorName, 'UTF-8'))) {
                    $newAuthorName = preg_replace($regex, "<span style='background-color: #aafffe'>$0</span>", mb_strtolower($authorName, 'UTF-8'));
                    break;
                }
                $step++;
            }

            return [
                'content' => $newContent,
                'author' => $newAuthorName
            ];
        }
    }

    /**
     * @param $search
     * @param $query
     */
    private function resolveTime(&$search, $query)
    {
        if (!empty($query['from']) && empty($query['to'])) {
            $search['from'] = Carbon::parse(str_replace('/', '-', $query['from']))->startOfDay()->timestamp;
            $search['to'] = Carbon::now()->timestamp;
        } else if (empty($query['from']) && !empty($query['to'])) {
            $to = Carbon::parse(str_replace('/', '-', $query['to']));
            $search['from'] = $to->startOfDay()->timestamp;
            $search['to'] = $to->isCurrentDay() ? Carbon::now()->timestamp : $to->endOfDay()->timestamp;
        } else if (!empty($query['from']) && !empty($query['to'])) {
            $search['from'] = Carbon::parse(str_replace('/', '-', $query['from']))->startOfDay()->timestamp;
            $search['to'] = Carbon::parse(str_replace('/', '-', $query['to']))->endOfDay()->timestamp;
        } else {
            $search['from'] = null;
            $search['to'] = null;
        }
    }

    /**
     * @param $ids
     * @return mixed
     */
    private function getListArticleByListId($ids)
    {
        $client = new Client();

        $url = env('API_BASE_URL') . '/be/articles/get-list-article-by-list-id';
        $res = $client->post($url, [
            'form_params' => [
                'ids' => json_encode($ids)
            ],
        ]);

        return json_decode($res->getBody()->getContents(), true);
    }

    /**
     * @param $permission
     */
    private function checkPermission($permission)
    {
        if (!can($permission)) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
    }

    /**
     * @param $isTopical
     * @param $article
     * @return string
     */
    private function resolveArticleLink($isTopical, $article)
    {
        if (!empty($isTopical) && $isTopical['status'] == 10) {
            switch (intval($isTopical['display_type'])) {
                case 1: {
                        $linkArticle = rtrim(env('WEB_BASE_URL'), '/') . '/cd-slide/' . $isTopical['id'] . '/' . $article['slug'] . '-' . $article['id'] . '.html';
                        break;
                    }
                case 2: {
                        $linkArticle = rtrim(env('WEB_BASE_URL'), '/') . '/news/' . $article['slug'] . '-' . $article['id'] . '.html';
                        break;
                    }
                default: {
                        $linkArticle = '';
                        break;
                    }
            }
        } else {
            $linkArticle = rtrim(env('WEB_BASE_URL'), '/') . '/tin/' . $article['slug'] . '-' . $article['id'] . '.html';
        }

        return $linkArticle;
    }
}
