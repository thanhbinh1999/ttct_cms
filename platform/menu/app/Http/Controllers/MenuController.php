<?php

namespace Kuroneko\Menu\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Menu\Classes\DataProviders\Menu\MenuDataProvider;
use Kuroneko\Menu\Classes\Processors\MenuProcessor;

/**
 * Class MenuController
 * @package Kuroneko\Menu\Http\Controllers
 * @author Giang Nguyen -　黒猫
 */
class MenuController extends Controller
{
    use WriteLogTrait;
    /**
     * @var MenuDataProvider
     */
    private $menuDataProvider;

    /**
     * @var MenuProcessor
     */
    private $menuProcessor;

    /**
     * MenuController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->menuDataProvider = app()->make(MenuDataProvider::class);
        $this->menuProcessor = app()->make(MenuProcessor::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        set_page_title('Menu');
        $listUrl = [
            'datatable' => route('menus.datatable'),
            'store' => env('API_BASE_URL') . '/be/menus/store',
            'build' => route('menuitems.index', 1)
        ];
        return view('menu::menu.index', compact('listUrl'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable(Request $request)
    {
        $query = $request->get('query', []);
        $sort = $request->get('sort', []);
        $pagination = $request->get('pagination', [
            'page' => 1,
            'perpage' => 10
        ]);
        try {
            $search = [];

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            if (!empty($query['search-key'])) {
                $search['key'] = $query['search-key'];
            }

            if (!empty($sort)) {
                $search['sort'] = $sort;
            }

            $data = $this->menuDataProvider->getListMenu(
                $pagination['page'],
                $pagination['perpage'],
                $search
            );

            foreach ($data['data'] as &$datum) {
                if (!empty($datum['url_get_data_edit'])) {
                    $datum['url_get_data_edit'] = route('menus.edit', $datum['id']);
                }
            }

            return response()->json($data);

        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'meta' => [
                    'meta' => [
                        'page' => $pagination['page'],
                        'pages' => 4,
                        'perpage' => $pagination['perpage'],
                        'total' => 0
                    ],
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
            $data = $this->menuDataProvider->getEdit($id);
            $data['url_update'] = route('menus.update', $data['id']);
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => '',
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
            $res = $this->menuProcessor->update($id, $request->all());
            return response()->json($res['res'], $res['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    public function removeCacheMenu()
    {
        if (\Cache::has('menu-admin')) {
            \Cache::delete('menu-admin');
        }
        return response()->json('ok');
    }
}
