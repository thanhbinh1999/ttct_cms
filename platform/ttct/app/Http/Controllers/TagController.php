<?php


namespace Kuroneko\Ttct\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Ttct\Classes\DataProviders\Tag\TagDataProvider;
use Kuroneko\Ttct\Classes\Processors\TagProcessor;

/**
 * Class TagController
 * @package Kuroneko\Ttct\Http\Controllers
 * @author Giang Nguyen - 黒猫
 */
class TagController extends Controller
{

    use WriteLogTrait;

    /**
     * @var TagDataProvider
     */
    private $tagDataProvider;

    /**
     * @var TagProcessor
     */
    private $tagProcessor;

    /**
     * TagController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->tagDataProvider = app()->make(TagDataProvider::class);
        $this->tagProcessor = app()->make(TagProcessor::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showTagIndex()
    {
        if (!can('tag-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Quản lý từ khóa');
        $listUrl = [
            'datatable' => route('ttct.tags.datatable'),
            'store' => route('ttct.tags.store')
        ];
        return view('ttct::tags.index-tag', compact('listUrl'));
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showThemeIndex()
    {
        if (!can('theme-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Quản lí chủ đề');
        $listUrl = [
            'datatable' => route('ttct.tags.datatable'),
            'store' => route('ttct.tags.store_theme')
        ];
        return view('ttct::tags.index-theme', compact('listUrl'));
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

            if (!empty($query['type'])) {
                $search['type'] = $query['type'];
            }

            if (!empty($query['search-key'])) {
                $search['key'] = $query['search-key'];
            }

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            if (!empty($sort)) {
                $search['sort'] = $sort;
            }

            $data = $this->tagDataProvider->getListTag($pagination['page'], $pagination['perpage'], $search);

            if (!empty($data['data'])) {
                foreach ($data['data'] as &$datum) {
                    $datum['url_get_data_edit'] = route('ttct.tags.edit', $datum['id']);
                    $datum['url_delete'] = route('ttct.tags.delete', $datum['id']);
                    $datum['url_restore'] = route('ttct.tags.restore', $datum['id']);
                }
            }


            return response()->json($data);
        } catch (\Exception $exception) {
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        try {
            if (!can('tag-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->tagDataProvider->getForEdit($id);
            if (empty($data)) {
                return response()->json([
                    'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
                ], 500);
            }

            $data['url_update'] = $data['type'] == 1 ? route('ttct.tags.update', $data['id']) : route('ttct.tags.update_theme', $data['id']);
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
    public function update($id, Request $request)
    {
        try {
            if (!can('tag-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $res = $this->tagProcessor->update($id, $request->all());
            return response()->json($res['res'], $res['code']);
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
    public function delete($id)
    {
        try {
            if (!can('tag-delete') && !can('theme-delete')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $res = $this->tagProcessor->delete($id);
            return response()->json($res['res'], $res['code']);
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
    public function restore($id)
    {
        try {
            if (!can('tag-restore') && !can('theme-restore')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $res = $this->tagProcessor->restore($id);
            return response()->json($res['res'], $res['code']);
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
    public function store(Request $request)
    {
        try {
            if (!can('tag-create')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $res = $this->tagProcessor->store($request->all());
            return response()->json($res['res'], $res['code']);
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
    public function updateTheme($id, Request $request)
    {
        if (!can('theme-update')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $thumb = $request->file('thumbnail');

        $data = [
            [
                'name' => 'name',
                'contents' => $request->get('name')
            ],
            [
                'name' => 'description',
                'contents' => $request->get('description')
            ]
        ];

        if (!empty($thumb)) {
            $data[] = [
                'name' => 'thumbnail',
                'contents' => file_get_contents($thumb->getRealPath()),
                'filename' => $thumb->getClientOriginalName()
            ];
        }

        try {
            $res = $this->tagProcessor->updateTheme($id, $data);
            if ($res['code'] == 200 && !empty($thumb)) {
                \File::delete($thumb->getRealPath());
            }
            return response()->json($res['res'], $res['code']);
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
    public function storeTheme(Request $request)
    {
        if (!can('theme-create')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $thumb = $request->file('thumbnail');

        $data = [
            [
                'name' => 'name',
                'contents' => $request->get('name')
            ],
            [
                'name' => 'description',
                'contents' => $request->get('description')
            ]
        ];

        if (!empty($thumb)) {
            $data[] = [
                'name' => 'thumbnail',
                'contents' => file_get_contents($thumb->getRealPath()),
                'filename' => $thumb->getClientOriginalName()
            ];
        }

        try {
            $res = $this->tagProcessor->storeTheme($data);
            if ($res['code'] == 200 && !empty($thumb)) {
                \File::delete($thumb->getRealPath());
            }
            return response()->json($res['res'], $res['code']);
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
    public function selectTag(Request $request)
    {
        try {
            $data = $this->tagDataProvider->selectTag($request->all());
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
    public function storeTagForCreateUpdateArticle(Request $request)
    {
        try {
            if (!can('tag-create')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }


            $res = $this->tagProcessor->storeTagForCreateUpdateArticle($request->all());
            return response()->json($res['res'], $res['code']);
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
    public function storeThemeForCreateUpdateArticle(Request $request)
    {
        if (!can('theme-create')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }


        $thumb = $request->file('thumbnail');

        $data = [
            [
                'name' => 'name',
                'contents' => $request->get('name')
            ],
            [
                'name' => 'description',
                'contents' => $request->get('description')
            ]
        ];

        if (!empty($thumb)) {
            $data[] = [
                'name' => 'thumbnail',
                'contents' => file_get_contents($thumb->getRealPath()),
                'filename' => $thumb->getClientOriginalName()
            ];
        }

        try {
            $res = $this->tagProcessor->storeThemeForCreateUpdateArticle($data);
            if ($res['code'] == 200 && !empty($thumb)) {
                \File::delete($thumb->getRealPath());
            }
            return response()->json($res['res'], $res['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }
}
