<?php

namespace Kuroneko\Rbac\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Rbac\Classes\DataProviders\Permission\PermissionDataProvider;
use Kuroneko\Rbac\Classes\DataProviders\Role\RoleDataProvider;
use Kuroneko\Rbac\Classes\Processors\RoleProcessor;
use Kuroneko\Rbac\Http\Requests\Role\CreateRoleRequest;
use Kuroneko\Rbac\Http\Requests\Role\UpdateRoleRequest;
use Kuroneko\Ttct\Classes\Constants\TagConstant;
use Kuroneko\User\Classes\DataProviders\User\UserDataProvider;

/**
 * Class RoleController
 * @package Kuroneko\Rbac\Http\Controllers
 * @author Giang Nguyen - 黒猫
 */
class RoleController extends Controller
{
    use WriteLogTrait;
    /**
     * @var RoleDataProvider
     */
    private $roleDataProvider;

    /**
     * @var RoleProcessor
     */
    private $roleProcessor;

    /**
     * @var PermissionDataProvider
     */
    private $permissionDataProvider;

    /**
     * @var UserDataProvider
     */
    private $userDataProvider;

    /**
     * RoleController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->roleDataProvider = app()->make(RoleDataProvider::class);
        $this->roleProcessor = app()->make(RoleProcessor::class);
        $this->permissionDataProvider = app()->make(PermissionDataProvider::class);
        $this->userDataProvider = app()->make(UserDataProvider::class);
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

        set_page_title('Vai trò');
        return view('rbac::roles.index');
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

            $data = $this->roleDataProvider->getListRoles(
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
                $datum['url_get_data_edit'] = route('rbac.roles.edit', $datum['id']);
                $datum['url_prepare_assign_permission'] = route('rbac.roles.prepare_assign_permissions', $datum['id']);
                if ($datum['status'] == TagConstant::TAG_STATUS_ACTIVE) {
                    $datum['url_delete'] = route('rbac.roles.delete', $datum['id']);
                } else {
                    $datum['url_restore'] = route('rbac.roles.restore', $datum['id']);
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
     * @param CreateRoleRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateRoleRequest $request)
    {
        try {
            if (!can('role-create')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $data = $request->validated();

            $role = $this->roleProcessor->insertDB($data);
            $build = $this->roleProcessor->buildElasticRole($role ? $role->id : 0);

            if ($build) {
                return response()->json([
                    'message' => 'Tạo mới role thành công'
                ]);
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $role = $this->roleDataProvider->findById($id);
        if (!empty($role)) {
            $role->url_update = route('rbac.roles.update', $role->id);
            return response()->json($role);
        } else {
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @param UpdateRoleRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdateRoleRequest $request)
    {
        try {
            if (!can('role-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $role = $this->roleDataProvider->findById($id);
            if (!empty($role)) {
                $data = $request->validated();
                $update = $this->roleProcessor->updateDB($id, $data);
                $build = $this->roleProcessor->buildElasticRole($id);

                if ($update && $build) {
                    return response()->json([
                        'message' => 'Cập nhật vai trò thành công'
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function prepareAssignPermissions($id)
    {
        $role = $this->roleDataProvider->findById($id);
        $permissionsOfRole = $role->permissions()->get()->toArray();
        $permissions = $this->permissionDataProvider->all()->toArray();
        foreach ($permissions as &$permission) {
            foreach ($permissionsOfRole as $item) {
                if ($item['id'] == $permission['id']) {
                    $permission['check'] = true;
                    break;
                }
            }
        }
        return response()->json([
            'role' => $role,
            'permissions' => $permissions,
            'update_url' => route('rbac.roles.update_assign_permission', $role->id)
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAssignPermission($id)
    {
        try {
            $role = $this->roleDataProvider->findById($id);
            $permission = \request()->post('permissions');

            $role->syncPermissions($permission);

            return response()->json([
                'message' => 'Cập nhật thành công'
            ]);
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
        $key = \request()->get('key', '');
        $page = \request()->get('page', 1);
        $except = empty(json_decode(\request()->get('except'))) ? [] : json_decode(\request()->get('except'));
        $role_of_user = empty(json_decode(\request()->get('role_of_user'))) ? [] : json_decode(\request()->get('role_of_user'));

        if (!empty($role_of_user)) {
            foreach ($role_of_user as $item) {
                $role = $this->userDataProvider->findById($item)->roles->first();
                if (!empty($role)) {
                    $except[] = $role->id;
                }
            }
        }

        $data = $this->roleDataProvider->getListRoles($page, 10, [
            'key' => $key,
            'except' => $except
        ]);
        return response()->json($data);
    }
}
