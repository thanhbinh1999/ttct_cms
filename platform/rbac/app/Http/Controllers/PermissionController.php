<?php


namespace Kuroneko\Rbac\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Rbac\Classes\Constants\PermissionConstant;
use Kuroneko\Rbac\Classes\DataProviders\Permission\PermissionDataProvider;
use Kuroneko\Rbac\Classes\Processors\PermissionProcessor;
use Kuroneko\Rbac\Http\Requests\Permission\CreatePermissionRequest;
use Kuroneko\Rbac\Http\Requests\Permission\UpdatePermissionRequest;

/**
 * Class PermissionController
 * @package Kuroneko\Rbac\Http\Controllers
 * @author Giang Nguyen - 黒猫
 */
class PermissionController extends Controller
{
    use WriteLogTrait;
    /**
     * @var PermissionProcessor
     */
    private $permissionProcessor;

    /**
     * @var PermissionDataProvider
     */
    private $permissionDataProvider;

    /**
     * PermissionController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->permissionProcessor = app()->make(PermissionProcessor::class);
        $this->permissionDataProvider = app()->make(PermissionDataProvider::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        if (!can('role-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }

        set_page_title('Quyền');
        return view('rbac::permissions.index');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable(Request $request)
    {
        $data = $request->all();

        $pagination = $data['pagination'];
        $sort = empty($data['sort']) ? [] : $data['sort'];
        $query = empty($data['query']) ? '' : $data['query'];
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

            $data = $this->permissionDataProvider->getListPermissions(
                empty($pagination['page']) ? 10 : $pagination['page'],
                empty($pagination['perpage']) ? 1 : $pagination['perpage'],
                $search
            );

            $meta = [
                'page' => $data['current_page'],
                'pages' => 4,
                'perpage' => $data['per_page'],
                'total' => $data['total_items']
            ];

            if (!empty($sort['sort']) && !empty($sort['field'])) {
                $meta['sort'] = $sort['sort'];
                $meta['field'] = $sort['field'];
            }

            $data = $data['data'];

            foreach ($data as &$datum) {
                $datum['created_at'] = date('d/m/Y H:i', $datum['created_at']);
                $datum['updated_at'] = date('d/m/Y H:i', $datum['updated_at']);
                $datum['url_get_data_edit'] = route('rbac.permissions.edit', $datum['id']);
                if ($datum['status'] == PermissionConstant::PERMISSION_STATUS_ACTIVE) {
                    $datum['url_delete'] = route('rbac.permissions.delete', $datum['id']);
                } else {
                    $datum['url_restore'] = route('rbac.permissions.restore', $datum['id']);
                }
            }

            return response()->json([
                'meta' => $meta,
                'data' => $data
            ]);

        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'meta' => [
                    'page' => $pagination['page'],
                    'pages' => $pagination['pages'],
                    'perpage' => $pagination['perpage'],
                    'total' => 0
                ],
                'data' => []
            ]);
        }
    }

    /**
     * @param CreatePermissionRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreatePermissionRequest $request)
    {
        try {
            if (!can('permission-create')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $request->validated();

            $permission = $this->permissionProcessor->insertDB($data);
            $build = $this->permissionProcessor->buildElasticPermission($permission ? $permission->id : 0);
            if ($build) {
                return response()->json([
                    'message' => 'Tạo mới quyền thành công'
                ]);
            } else {
                return response()->json([
                    'message' => 'Oop, có lỗi xảy ra, thử lại sau'
                ], 500);
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
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
        $permission = $this->permissionDataProvider->findById($id);
        if (!empty($permission)) {
            $permission->update_url = route('rbac.permissions.update', $permission->id);
            return response()->json($permission);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @param UpdatePermissionRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdatePermissionRequest $request)
    {
        try {
            if (!can('permission-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $permission = $this->permissionDataProvider->findById($id);

            if (!empty($permission)) {
                $data = $request->validated();
                $update = $this->permissionProcessor->updateDB($id, $data);
                $build = $this->permissionProcessor->buildElasticPermission($id);
                if ($update && $build) {
                    return response()->json([
                        'message' => 'Cập nhật quyền thành công'
                    ]);
                }
            }
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function select2()
    {
        try {
            $page = \request()->post('page', 1);
            $term = \request()->post('term', '');
            $data = $this->permissionDataProvider->getListPermissions($page, 10, [
                'key' => $term
            ]);

            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([]);
        }
    }
}
