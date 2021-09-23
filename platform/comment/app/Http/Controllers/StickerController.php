<?php


namespace Kuroneko\Comment\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Comment\Classes\DataProviders\Sticker\StickerDataProvider;
use Kuroneko\Comment\Classes\DataProviders\StickerThemeDataProvider;
use Kuroneko\Comment\Classes\Processors\StickerProcessor;
use Kuroneko\Comment\Classes\Upload\ImageUpload;
use Kuroneko\Comment\Http\Requests\Sticker\CreateStickerRequest;
use Kuroneko\Comment\Http\Requests\Sticker\UpdateStickerRequest;
use Kuroneko\Core\Traits\WriteLogTrait;

/**
 * Class StickerController
 * @package Kuroneko\Comment\Http\Controllers
 * @author GIang Nguyen - 黒猫
 */
class StickerController extends Controller
{
    use WriteLogTrait;
    /**
     * @var StickerDataProvider
     */
    private $stickerDataProvider;

    /**
     * @var StickerThemeDataProvider
     */
    private $stickerThemeDataProvider;

    /**
     * @var StickerProcessor
     */
    private $stickerProcessor;
    /**
     * @var string
     */
    private $baseUrl;

    /**
     * StickerController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->stickerDataProvider = app()->make(StickerDataProvider::class);
        $this->stickerThemeDataProvider = app()->make(StickerThemeDataProvider::class);
        $this->stickerProcessor = app()->make(StickerProcessor::class);
        $this->baseUrl = rtrim(env('RESOURCE_BASE_URL'), '/') . DIRECTORY_SEPARATOR . ltrim(env('RESOURCE_FOLDER'), '/');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        if (!can('sticker-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Nhãn dán');

        return view('comment::stickers.index');
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
            $search = [];

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            } else {
                $search['status'] = 'active';
            }

            if (!empty($query['search-key'])) {
                $search['search-key'] = $query['search-key'];
            }


            if (!empty($query['theme'])) {
                $search['theme'] = $query['theme'];
            }

            $data = $this->stickerDataProvider->getListSticker(
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

            foreach ($data['data'] as &$datum) {
                $datum['url_edit'] = route('comments.stickers.edit', $datum['id']);
                if ($datum['status'] == 2) {
                    $datum['url_delete'] = route('comments.stickers.delete', $datum['id']);
                } else {
                    $datum['url_restore'] = route('comments.stickers.restore', $datum['id']);
                }
                $datum['created_at'] = date('d/m/Y H:i', $datum['created_at']);
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        if (!can('sticker-update')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $this->stickerDataProvider->getStickerDetail($id);
        if (empty($data)) {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thư lại sau'
            ], 500);
        } else {
            $data['url_update'] = route('comments.stickers.update', $id);
            return response()->json($data);
        }
    }

    /**
     * @param $id
     * @param UpdateStickerRequest $request
     * @param ImageUpload $imageUpload
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdateStickerRequest $request, ImageUpload $imageUpload)
    {
        if (!can('sticker-update')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $request->validated();

        if (!empty($data['new_avatar'])) {
            $tmp = $imageUpload->upload($data['new_avatar']);
            $avatar = [
                "id" => $id,
                "name" => $data['name'],
                "description" => empty($data['note']) ? $data['name'] : $data['note'],
                "avatar_base_url" => $this->baseUrl,
                "avatar_path" => $tmp['absolute_url']
            ];
        } else {
            $avatar = [
                "id" => $id,
                "name" => $data['name'],
                "description" => empty($data['note']) ? $data['name'] : $data['note'],
                "avatar_base_url" => $data['old_avatar_base_url'],
                "avatar_path" => $data['old_avatar_path']
            ];
        }

        $data = $this->stickerProcessor->updateSticker($avatar);

        if ($data) {
            return response()->json([
                'message' => 'Cập nhật sticker thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @param CreateStickerRequest $request
     * @param ImageUpload $imageUpload
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateStickerRequest $request, ImageUpload $imageUpload)
    {
        if (!can('sticker-create')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $request->validated();

        $avatar = $imageUpload->upload($data['avatar']);

        $dataStore = [
            "name" => $data['name'],
            "description" => empty($data['note']) ? $data['name'] : $data['note'],
            "sk_theme_id" => empty($data['sticker-theme']) ? 0 : $data['sticker-theme'],
            "avatar_base_url" => $this->baseUrl,
            "avatar_path" => $avatar['absolute_url'],
            'user_id' => auth()->user()->id,
            'app_id' => 19
        ];

        $data = $this->stickerProcessor->storeSticker($dataStore);

        if ($data) {
            return response()->json([
                'message' => 'Tạo mới sticker thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        if (!can('sticker-delete')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $request->post('data', null);
        if (empty($data)) {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }

        $data = [
            "id" => $id,
            "name" => $data['name'],
            'sk_theme_id' => $data['sk_theme_id'],
            'status' => 3,
            "description" => $data['description'],
            "avatar_base_url" => $data['avatar_base_url'],
            "avatar_path" => $data['avatar_path']
        ];

        $data = $this->stickerProcessor->updateSticker($data);

        if ($data) {
            return response()->json([
                'message' => 'Xóa sticker thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($id, Request $request)
    {
        if (!can('sticker-restore')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $request->post('data', null);
        if (empty($data)) {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }

        $data = [
            "id" => $id,
            "name" => $data['name'],
            'sk_theme_id' => $data['sk_theme_id'],
            'status' => 2,
            "description" => $data['description'],
            "avatar_base_url" => $data['avatar_base_url'],
            "avatar_path" => $data['avatar_path']
        ];

        $data = $this->stickerProcessor->updateSticker($data);

        if ($data) {
            return response()->json([
                'message' => 'Khôi phục sticker thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }
}
