<?php


namespace Kuroneko\Menu\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Menu\Classes\DataProviders\Menu\MenuDataProvider;
use Kuroneko\Menu\Classes\DataProviders\MenuItem\MenuItemDataProvider;
use Kuroneko\Menu\Classes\Processors\MenuItemProcessor;

/**
 * Class MenuItemController
 * @package Kuroneko\Menu\Http\Controllers
 * @author Giang Nguyen - 黒猫
 */
class MenuItemController extends Controller
{
    use WriteLogTrait;
    /**
     * @var MenuDataProvider
     */
    private $menuDataProvider;

    /**
     * @var MenuItemDataProvider
     */
    private $menuItemDataProvider;

    /**
     * @var M<MenuItemProcessor
     */
    private $menuItemProcessor;

    /**
     * MenuItemController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->menuDataProvider = app()->make(MenuDataProvider::class);
        $this->menuItemDataProvider = app()->make(MenuItemDataProvider::class);
        $this->menuItemProcessor = app()->make(MenuItemProcessor::class);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index($id)
    {
        if (!can('menu-item-build')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        $menu = $this->menuDataProvider->getEdit($id);
        if (!empty($menu)) {
            set_page_title('Build menu');
            $listUrl = [
                'prepare_data_build' => route('menuitems.prepare_data_build', $id),
                'menuitems_edit' => route('menuitems.edit') . '/',
                'menuitems_update_order' => route('menuitems.update_order'),
                'menuitems_delete' => route('menuitems.delete') . '/',
                'menuitems_restore' => route('menuitems.restore') . '/',
                'menuitems_store' => route('menuitems.store', $id),
                'menuitems_select_route' => route('menuitems.select_route')
            ];
            return view('menu::menu-items.index', compact('menu', 'listUrl'));
        } else {
            abort(404);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function prepareDataBuild($id)
    {
        try {
            $data = $this->menuItemDataProvider->prepareDataBuild($id);
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        try {
            $data = $this->menuItemDataProvider->editEdit($id);
            $data['url_update'] = route('menuitems.update', $id);
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
            $res = $this->menuItemProcessor->update($id, $request->all());
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
    public function updateOrder(Request $request)
    {
        try {
            $res = $this->menuItemProcessor->updateOrder($request->all());
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
    public function store($id, Request $request)
    {
        try {
            $res = $this->menuItemProcessor->store($id, $request->all());
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
            $res = $this->menuItemProcessor->restore($id);
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
            $res = $this->menuItemProcessor->delete($id);
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
     */
    public
    function getRouteName()
    {
        $term = \request()->get('term');
        $routes = collect(app('router')->getRoutes())->map(function ($route) {
            return [
                'uri' => $route->uri,
                'name' => $route->getName()
            ];
        });

        if (!empty($term)) {
            $routes = collect($routes)->filter(function ($item) use ($term) {
                return preg_match("/{$term}/i", $item['name']);
            });
        }

        return response()->json($routes);
    }
}
