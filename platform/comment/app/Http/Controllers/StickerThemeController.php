<?php


namespace Kuroneko\Comment\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Comment\Classes\DataProviders\StickerThemeDataProvider;
use Kuroneko\Comment\Classes\Processors\StickerThemeProcessor;
use Kuroneko\Comment\Classes\Upload\ImageUpload;
use Kuroneko\Comment\Http\Requests\StickerTheme\CreateStickerThemeRequest;
use Kuroneko\Comment\Http\Requests\StickerTheme\UpdateStickerThemeRequest;
use Kuroneko\Core\Traits\WriteLogTrait;

/**
 * Class StickerThemeController
 * @package Kuroneko\Comment\Http\Controllers
 * @author GIang Nguyen - 黒猫
 */
class StickerThemeController extends Controller
{
    use WriteLogTrait;
    /**
     * @var StickerThemeDataProvider
     */
    private $stickerThemeProvider;

    /**
     * @var StickerThemeProcessor
     */
    private $stickerThemeProcessor;

    private $baseUrl;

    /**
     * StickerThemeController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->stickerThemeProvider = app()->make(StickerThemeDataProvider::class);
        $this->stickerThemeProcessor = app()->make(StickerThemeProcessor::class);
        $this->baseUrl = rtrim(env('RESOURCE_BASE_URL'), '/') . DIRECTORY_SEPARATOR . ltrim(env('RESOURCE_FOLDER'), '/');
    }

    public function index()
    {
        if (!can('sticker-theme-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Bộ nhãn dán');
        return view('comment::sticker-theme.index');
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
            if (!empty($query['get_sticker'])) {
                $search['get_sticker'] = $query['get_sticker'];
            }

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            if (!empty($query['search-key'])) {
                $search['search-key'] = $query['search-key'];
            }

            $data = $this->stickerThemeProvider->getListStickerTheme(
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
                $datum['url_edit'] = route('comments.sticker_themes.edit', $datum['id']);
                if ($datum['status'] == 2) {
                    $datum['url_delete'] = route('comments.sticker_themes.delete', $datum['id']);
                } else {
                    $datum['url_restore'] = route('comments.sticker_themes.restore', $datum['id']);
                }
                $datum['created_at'] = date('d/m/Y H:i', $datum['created_at']);
                if (!empty($datum['stickers'])) {
                    usort($datum['stickers'], function ($one, $two) {
                        if ($one['order'] == $two['order']) {
                            return 0;
                        }
                        return ($one['order'] < $two['order']) ? -1 : 1;
                    });
                }
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function getListStickerTheme()
    {
        $data = $this->stickerThemeProvider->getListStickerTheme(1, 1000, ['status' => 'all']);
        return response()->json($data);
    }

    /**
     * @param CreateStickerThemeRequest $request
     * @param ImageUpload $imageUpload
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateStickerThemeRequest $request, ImageUpload $imageUpload)
    {
        if (!can('sticker-theme-create')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $request->validated();

        $descriptions = $data['descriptions'];
        $names = $data['names'];
        //
        $stickers = collect($data['files'])->map(function ($file, $index) use ($imageUpload, $names, $descriptions) {
            $tmp = $imageUpload->upload($file);
            return [
                "id" => "0",
                "name" => empty($names[$index]) ? $tmp['name'] : $names[$index],
                "description" => empty($descriptions[$index]) ? (empty($names[$index]) ? $tmp['name'] : $names[$index]) : $descriptions[$index],
                "is_theme_avatar" => 0,
                "avatar_base_url" => $this->baseUrl,
                "avatar_path" => $tmp['absolute_url'],
                "user_id" => auth()->user()->id,
            ];
        });
        //avatar
        $avatar = $imageUpload->upload($data['avatar']);

        $theme = [
            "name" => $data['name'],
            "description" => empty($data['note']) ? $data['name'] : $data['note'],
            "user_id" => auth()->user()->id,
            "app_id" => 19,
            "avatar_base_url" => $this->baseUrl,
            "avatar_path" => $avatar['absolute_url']
        ];

        $data = $this->stickerThemeProcessor->storeStickerTheme($theme, $stickers);
        if ($data) {
            return response()->json([
                'message' => 'Tạo mới sticker theme thành công'
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
    public function edit($id)
    {
        if (!can('sticker-theme-update')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $this->stickerThemeProvider->getStickerThemeDetail($id);
        if (!empty($data['stickers'])) {
            usort($data['stickers'], function ($one, $two) {
                if ($one['order'] == $two['order']) {
                    return 0;
                }
                return ($one['order'] < $two['order']) ? -1 : 1;
            });
            $stickers = [];
            foreach ($data['stickers'] as $datum) {
                if ($datum['status'] == 2) {
                    $stickers[] = $datum;
                }
            }
            $data['stickers'] = $stickers;
        }
        if (empty($data)) {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thư lại sau'
            ], 500);
        } else {
            $data['url_update'] = route('comments.sticker_themes.update', $id);
            return response()->json($data);
        }
    }

    /**
     * @param $id
     * @param UpdateStickerThemeRequest $request
     * @param ImageUpload $imageUpload
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdateStickerThemeRequest $request, ImageUpload $imageUpload)
    {
        if (!can('sticker-theme-update')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $request->validated();

        $newStickers = [];
        $oldStickers = [];
        // if has new sticker
        if (!empty($data['new_stickers'])) {
            $newNames = $data['new_names'];
            $newDescriptions = $data['new_descriptions'];
            //upload and add to array id = 0
            $newStickers = collect($data['new_stickers'])->map(function ($image, $index) use ($imageUpload, $newNames) {
                $image = $imageUpload->upload($image);
                return [
                    "id" => "0",
                    "name" => empty($newNames[$index]) ? $image['name'] : $newNames[$index],
                    "description" => empty($newDescriptions[$index]) ? (empty($newNames[$index]) ? $image['name'] : $newNames[$index]) : $newDescriptions[$index],
                    "is_theme_avatar" => 0,
                    "avatar_base_url" => $this->baseUrl,
                    "avatar_path" => $image['absolute_url'],
                    "user_id" => auth()->user()->id
                ];
            });
        }
        //if has old sticker
        if (!empty($data['old_stickers'])) {
            $oldNames = $data['old_names'];
            $oldDescriptions = $data['old_descriptions'];
            $oldAvatarBaseUrls = $data['old_sticker_avatar_base_urls'];
            $oldAvatarPaths = $data['old_sticker_avatar_paths'];
            //add to old sticker
            $oldStickers = collect($data['old_stickers'])->map(function ($sticker, $index) use ($oldNames, $oldDescriptions, $oldAvatarBaseUrls, $oldAvatarPaths) {
                return [
                    "id" => $sticker,
                    "name" => $oldNames[$index],
                    "description" => $oldDescriptions[$index],
                    "is_theme_avatar" => 0,
                    "avatar_base_url" => $oldAvatarBaseUrls[$index],
                    "avatar_path" => $oldAvatarPaths[$index],
                    "user_id" => auth()->user()->id
                ];
            });
        }
        //combine 2 array sticker with order
        $tmp = collect($newStickers)->merge($oldStickers);
        $stickers = [];
        $order = json_decode($data['order'], true);
        foreach ($order as $index => $name) {
            foreach ($tmp as $ord => &$sticker) {
                if (!is_null($sticker) && $name == $sticker['name']) {
                    $stickers[] = $sticker;
                    $tmp[$ord] = null;
                    break;
                }
            }
        }

        //if has new sticker theme avatar
        if (!empty($data['new_avatar'])) {
            $avatar = $imageUpload->upload($data['new_avatar']);
            $theme = [
                "id" => $id,
                "name" => $data['name'],
                "description" => empty($data['note']) ? $data['name'] : $data['note'],
                "user_id" => auth()->user()->id,
                "app_id" => 19,
                "avatar_base_url" => $this->baseUrl,
                "avatar_path" => $avatar['absolute_url'],

            ];
        } else {
            $theme = [
                "id" => $id,
                "name" => $data['name'],
                "description" => empty($data['note']) ? $data['name'] : $data['note'],
                "user_id" => auth()->user()->id,
                "app_id" => 19,
                "avatar_base_url" => $data['old_avatar_base_url'],
                "avatar_path" => $data['old_avatar_path'],
            ];
        }
        //almost done
        $data = $this->stickerThemeProcessor->updateStickerTheme($theme, $stickers);
        if ($data) {
            return response()->json([
                'message' => 'Cập nhật sticker theme thành công'
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
        if (!can('sticker-theme-delete')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $this->stickerThemeProcessor->deleteStickerTheme($id);
        if ($data) {
            return response()->json([
                'message' => 'Xóa sticker theme thành công'
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
    public function restore($id)
    {
        if (!can('sticker-theme-restore')) {
            return response()->json([
                'message' => 'Không thể truy cập chức năng này'
            ], 403);
        }

        $data = $this->stickerThemeProcessor->restoreStickerTheme($id);
        if ($data) {
            return response()->json([
                'message' => 'Xóa sticker theme thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }
}
