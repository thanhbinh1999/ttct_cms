<?php


namespace Kuroneko\Ttct\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Ttct\Classes\DataProviders\ReservePaper\ReservePaperDataProvider;
use Kuroneko\Ttct\Classes\Processors\ReservePaperProcessor;

/**
 * Class ReservePaperController
 * @package Kuroneko\Ttct\Http\Controllers
 * @author Giang Nguyen - 黒猫
 */
class ReservePaperController extends Controller
{
    use WriteLogTrait;

    /**
     * @var ReservePaperProcessor
     */
    private $reservePaperProcessor;

    /**
     * @var ReservePaperDataProvider
     */
    private $reservePaperDataProvider;

    /**
     * ReservePaperController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->reservePaperProcessor = app()->make(ReservePaperProcessor::class);
        $this->reservePaperDataProvider = app()->make(ReservePaperDataProvider::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        if (!can('reserve-paper-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }

        set_page_title('Quản lý Kỳ báo');
        $listUrl = [
            'store' => env('API_BASE_URL') . '/be/reserve-papers/store',
            'datatable' => route('ttct.reserve_paper.datatable')
        ];
        return view('ttct::reserve-paper.index', compact('listUrl'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        if (!can('reserve-paper-update')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }

        set_page_title('Cập nhật kỳ báo');
        $listUrl = [
            'select-category' => route('ttct.categories.select_categories'),
            'select-tag' => route('ttct.tags.select_tag'),
            'update' => route('ttct.reserve_paper.update', $id),
            'update-status' => route('ttct.reserve_paper.update_status', $id),
            'get-data-edit' => route('ttct.reserve_paper.get_data_edit', $id),
            'datatable-resource' => route('ttct.resources.datatable'),
            'url-upload-multi' => route('ttct.resources.store_multi'),
            'url-get-resource-detail' => route('ttct.resources.get_detail') . '/',
            'select-theme' => route('ttct.tags.select_tag'),
            'store-tag' => route('ttct.tags.store_tag_for_create_update_article'),
            'store-theme' => route('ttct.tags.store_theme_for_create_update_article'),
            'previous-url' => url()->previous(),
        ];
        return view('ttct::reserve-paper.edit', compact('listUrl'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable(Request $request)
    {
        $query = $request->post('query', []);
        $pagination = $request->post('pagination', [
            'page' => 1,
            'perpage' => 10
        ]);
        $sort = $request->post('sort', []);
        try {
            $search = [];
            if (!empty($query['search-key'])) {
                $search['key'] = $query['search-key'];
            }

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }
            if (!empty($sort)) {
                $search['sort'] = $sort;
            }
         
            $data = $this->reservePaperDataProvider->getListReservePaper($pagination['page'], $pagination['perpage'], $search);

            foreach ($data['data'] as &$datum) {
                if (!empty($datum['url_take_down'])) {
                    $datum['url_take_down'] = route('ttct.reserve_paper.update_status', $datum['id']);
                }
                if (!empty($datum['url_restore'])) {
                    $datum['url_restore'] = route('ttct.reserve_paper.update_status', $datum['id']);
                }
                if (!empty($datum['url_publish'])) {
                    $datum['url_publish'] = route('ttct.reserve_paper.update_status', $datum['id']);
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
            $data = $this->reservePaperProcessor->store($request->all());
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
            $data = $this->reservePaperDataProvider->getDataEdit($id);
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
    public function updateStatus($id, Request $request)
    {
        try {
            if (!can('reserve-paper-publish') && !can('reserve-paper-restore') && !can('reserve-paper-take-down')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->reservePaperProcessor->updateStatus($id, $request->all());
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
            if (!can('reserve-paper-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $this->reservePaperProcessor->update($id, $request->all());
            return response()->json($data['res'], $data['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }
}
