<?php


namespace Kuroneko\Comment\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Comment\Classes\DataProviders\BlackKey\BlackKeyDataProvider;
use Kuroneko\Comment\Classes\Processors\BlackKeyProcessor;
use Kuroneko\Comment\Http\Requests\BlackKey\CreateBlackKeyRequest;
use Kuroneko\Core\Traits\WriteLogTrait;

/**
 * Class BlackKeyController
 * @package Kuroneko\Comment\Http\Controllers
 * @author GIang Nguyen - 黒猫
 */
class BlackKeyController extends Controller
{
    use WriteLogTrait;

    /**
     * @var BlackKeyDataProvider
     */
    private $blackKeyDataProvider;

    /**
     * @var BlackKeyProcessor
     */
    private $blackKeyProcessor;

    /**
     * BlackKeyController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->blackKeyDataProvider = app()->make(BlackKeyDataProvider::class);
        $this->blackKeyProcessor = app()->make(BlackKeyProcessor::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        if (!can('black-key-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }

        set_page_title('Black key');
        return view('comment::black-key.index');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable(Request $request)
    {
        $query = $request->post('query');
        $sort = $request->post('sort');

        $pagination = $request->post('pagination');

        try {
            $search = [];

            if (!empty($query['search-key'])) {
                $search['search-key'] = $query['search-key'];
            }

            if (!empty($sort)) {
                $search['sort'] = $sort['sort'];
            }

            $data = $this->blackKeyDataProvider->getListBlackKey(
                $pagination['page'],
                $pagination['perpage'],
                $search
            );

            $meta = [
                'page' => $data['current_page'],
                'pages' => 4,
                'perpage' => $data['per_page'],
                'total' => $data['total_items']
            ];

            if (can('black-key-delete'))
                foreach ($data['data'] as &$datum) {
                    $datum['url_delete'] = route('comments.black_keys.delete', $datum['id']);
                }

            return response()->json([
                'meta' => $meta,
                'data' => $data['data']
            ]);

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
     * @param CreateBlackKeyRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateBlackKeyRequest $request)
    {
        if (!can('black-key-create')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }
        $data = $request->validated();

        $data = $this->blackKeyProcessor->storeBlackKey($data['key']);

        if ($data) {
            return response()->json([
                'message' => 'Tạo mới black key thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        if (!can('black-key-delete')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }
        $data = $this->blackKeyProcessor->deleteBlackKey($id);
        if ($data) {
            return response()->json([
                'message' => 'Xóa black key thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }
}
