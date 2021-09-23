<?php

namespace Kuroneko\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Carbon;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Rbac\Classes\DataProviders\Permission\PermissionDataProvider;
use Kuroneko\Rbac\Classes\DataProviders\Role\RoleDataProvider;
use Kuroneko\User\Classes\DataProviders\User\UserDataProvider;
use Kuroneko\User\Classes\Processors\UserProcessor;
use Kuroneko\User\Classes\Uploads\ResourceUpload;
use Kuroneko\User\Http\Request\CreateUserRequest;
use Kuroneko\User\Http\Request\UpdateAssignRolePermissionRequest;
use Kuroneko\User\Http\Request\UpdateProfileRequest;
use Kuroneko\User\Models\User;
use Kuroneko\User\Notifications\ArticleTransferNotification;

/**
 * Class UserController
 * @package Kuroneko\User\Http\Controllers
 *
 */
class UserController extends Controller
{
    use WriteLogTrait;

    /**
     * @var UserDataProvider
     */
    private $userDataProvider;

    /**
     * @var PermissionDataProvider
     */
    private $permissionDataProvider;

    /**
     * @var RoleDataProvider
     */
    private $roleDataProvider;

    /**
     * @var UserProcessor
     */
    private $userProcessor;

    /**
     * UserController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->userDataProvider = app()->make(UserDataProvider::class);
        $this->permissionDataProvider = app()->make(PermissionDataProvider::class);
        $this->roleDataProvider = app()->make(RoleDataProvider::class);
        $this->userProcessor = app()->make(UserProcessor::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        if (!can('user-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Quản lý người dùng CMS');
        $listUrl = [
            'datatable' => route('users.datatable')
        ];
        return view('user::index', compact('listUrl'));
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

            $data =
                User::where(function ($que) use ($query, $sort) {
                    if (!empty($query['search-key'])) {
                        $que->where('username', 'like', "%{$query['search-key']}%");
                    }
                    $que->whereNotIn('id', [auth()->user()->id]);
                    return $que;
                })
                    ->skip(intval($pagination['page']) - 1)
                    ->take($pagination['perpage']);

            if (!empty($sort))
                $data = $data->orderBy($sort['field'], $sort['sort']);

            $data = $data->get()->map(function ($user) {
                if (auth()->user()->can('user-assign-role-permission')) {
                    $user->url_prepare_assign = route('users.prepare_data_for_assign', $user->id);
                    $user->role = $user->roles->first();
                    $user->login_at = !empty($user->login_at) ? Carbon::parse($user->login_at)->format('d/m/Y H:i') : null;
                }
                return $user;
            })->toArray();

            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => User::count()
            ];

            return response()->json([
                'meta' => $meta,
                'data' => $data
            ]);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => User::count()
            ];

            return response()->json([
                'meta' => $meta,
                'data' => $data
            ]);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function prepareDataForAssign($id)
    {
        try {
            $user = $this->userDataProvider->findById($id);
            $roles = $user->roles;
            $userPermissions = $user->permissions;
            $except = [];
            $userPermissions = $userPermissions->map(function ($per) use ($except) {
                $except[] = $per->id;
                $per->check = true;
                return $per;
            });
            $allPermission = $this->permissionDataProvider->allBy([
                'WHERE' => [
                    ['id', 'NOT_IN', $except]
                ]
            ]);

            $allPermission = $allPermission->merge($userPermissions);

            return response()->json([
                'role' => $roles->first(),
                'permissions' => $allPermission,
                'url_update' => route('users.update_assign_role_permission', $user->id)
            ]);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @param UpdateAssignRolePermissionRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAssignRolePermission($id, UpdateAssignRolePermissionRequest $request)
    {
        try {
            $user = $this->userDataProvider->findById($id);
            if (!empty($user)) {
                $data = $request->validated();
                $role = $this->roleDataProvider->findById($data['role']);
                $permissions = $this->permissionDataProvider->findManyById($data['permissions']);

                $user->syncRoles($role);

                $user->syncPermissions($permissions ? $permissions : []);

                $this->userProcessor->buildElasticUser($id);

                return response()->json([
                    'message' => 'Cập nhật thành công!'
                ]);
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        if (!can('user-create')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Tạo mới người dùng CMS');
        return view('user::create');
    }

    /**
     * @param CreateUserRequest $request
     * @param ResourceUpload $resourceUpload
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateUserRequest $request, ResourceUpload $resourceUpload)
    {
        try {
            $data = $request->validated();

            $avatar = $data['avatar'];

            $avatar = $resourceUpload->upload($avatar);

            $data['avatar_base_url'] = env('RESOURCE_BASE_URL') . DIRECTORY_SEPARATOR . env('RESOURCE_FOLDER');

            $data['avatar'] = $avatar['absolute_url'];

            $data['password'] = \Hash::make($data['password']);


            $user = $this->userProcessor->insertDB($data);

            $role = $this->roleDataProvider->findById($data['role']);

            $user->syncRoles($role);

            $this->userProcessor->buildElasticUser($user->id);

            if ($user) {
                return response()->json([
                    'message' => 'Tạo mới user thành công',
                    'redirect' => route('users.index')
                ]);
            }
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, thử lại sau'
            ], 500);
        }
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function profile()
    {
        set_page_title('Cập nhật profile');
        return view('user::update-profile');
    }

    /**
     * @param UpdateProfileRequest $request
     * @param ResourceUpload $resourceUpload
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(UpdateProfileRequest $request, ResourceUpload $resourceUpload)
    {
        try {
            $data = $request->validated();

            if (!empty($data['avatar'])) {
                $avatar = $data['avatar'];

                $avatar = $resourceUpload->upload($avatar);

                $data['avatar_base_url'] = env('RESOURCE_BASE_URL') . DIRECTORY_SEPARATOR . env('RESOURCE_FOLDER');

                $data['avatar'] = $avatar['absolute_url'];

            }

            $update = $this->userProcessor->updateDB(auth()->user()->id, $data);
            $this->userProcessor->buildElasticUser(auth()->user()->id);

            if ($update) {
                return response()->json([
                    'message' => 'Cập nhật profile thành công',
                ]);
            }
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
    public function getUserAcl()
    {
        $role = auth()->user()->roles->first();
        $permissions = auth()->user()->getAllPermissions();
        return response()->json(
            [
                'role' => $role,
                'permissions' => $permissions
            ]
        );
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function select2()
    {
        $page = \request()->post('page', 10);
        $key = \request()->post('key', '');
        $roles = json_decode(\request()->get('roles', '[]'));
        $getAll = \request()->post('all');
        $users = collect([]);
        if (!empty($roles)) {
            foreach ($roles as $role) {
                $role = $this->roleDataProvider->findById($role);
                $this->userDataProvider->getUsersByRole($role->name)->map(function ($user) use ($users) {
                    $users->push($user->id);
                });
            }

        }
        $class = get_class(auth()->user());

        if ($getAll == 1) {
            $except = collect([]);
        } else {
            $except = \DB::table('users')
                ->leftJoin('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                ->where('model_has_roles.role_id', 1)
                ->pluck('users.id')->add(auth()->user()->id);
        }


        $tmpExcept = collect(json_decode(\request()->post('except', '[]')))->map(function ($item) {
            return intval($item);
        });

        $except = $except->merge($tmpExcept)->merge($users)->unique();

        $data = $class::where(function ($query) use ($key) {
            $query->where('username', 'like', '%' . $key . '%')
                ->orWhere('first_name', 'like', "%${key}%")
                ->orWhere('last_name', 'like', "%${key}%");
            return $query;
        })
            ->with(['roles' => function ($query) {
                $query->select('id', 'name');
                return $query;
            }])
            ->whereNotIn('id', $except)
            ->select(['id', 'username', 'first_name', 'last_name'])
            ->paginate($page);
        return response()->json($data);
    }

    public function sendNotification(Request $request)
    {
        $data = $request->all();

        $data = [
            'from_user' => $data['from_user'],
            'from_user_full_name' => $data['from_user_full_name'],
            'from_user_username' => $data['from_user_username'],
            'note' => $data['note'],
            'article' => empty($data['article']) ? '' : $data['article'],
            'sb_or_fw' => $data['sb_or_fw'],
            'to_user' => $data['to_user'],
            'to_user_full_name' => $data['to_user_full_name'],
            'to_user_username' => $data['to_user_username'],
            'type' => $data['type'],
        ];

        if ($data['type'] == 'user') {
            $user = $this->userDataProvider->findById($data['to_user']);
            if (!empty($user))
                $user->notify(new ArticleTransferNotification($data));
        } else {
            $users = User::whereHas("roles", function ($q) use ($data) {
                $q->where("name", $data['to_user_full_name']);
            })->get();
            if (!empty($users)) {
                foreach ($users as $user) {
                    $user->notify(new ArticleTransferNotification($data));
                }
            }
        }
    }

    public function markAsReadNotify($id)
    {
        $notification = auth()->user()->notifications()->where('id', $id)->first();

        if ($notification) {
            $notification->markAsRead();
            return response()->json('ok');
        }
        return response()->json('error', 500);
    }

    public function showNotify()
    {
        set_page_title('Thông báo của bạn');
        return view('user::notify');
    }

    public function datatableNotify(Request $request)
    {
        $data = $request->all();

        $pagination = $data['pagination'];
        $sort = empty($data['sort']) ? [] : $data['sort'];
        $query = empty($data['query']) ? '' : $data['query'];
        try {

            $data =
                DatabaseNotification::where(function ($que) use ($query, $sort) {
                    $que->where('notifiable_id', auth()->user()->id);
                    return $que;
                })
                    ->skip(intval($pagination['page']) - 1)
                    ->take($pagination['perpage'])
                    ->orderBy('created_at', 'desc');

            $data = $data->get()->map(function ($item) {
                $html = '<div class="kt-notification">';
                $data = $item->data['data'];
                $notifyType = strval($item->type);
                $readAt = empty($item->read_at) ? null : $item->read_at;

                switch ($notifyType) {
                    case 'Kuroneko\User\Notifications\ArticleTransferNotification':
                    {
                        $text = $data['type'] == 'user' ? ('<strong>' . $data['from_user_username'] . '</strong> vừa ' . ($data['sb_or_fw'] == 1 ? 'chuyển một bài viết đến bạn' : 'trả lại một bài viết') . ': <strong>' . ($data['sb_or_fw'] == 1 ? $data['note'] : $data['article']) . '</strong>') : ('<strong>' . $data['from_user_username'] . '</strong> vừa chuyển một bài viết đến vai trò của bạn: <strong>' . $data['note'] . '</strong>');
                        $time = $item->created_at->diffForHumans();
                        $route = $data['sb_or_fw'] == 1 ? ($data['type'] == 'user' ? route('ttct.articles.article_for_me') : route('ttct.articles.article_send_by_role')) : route('ttct.articles.article_send_back');
                        $html .= '<a href="' . $route . '" class="kt-notification__item" data-url="' . route('users.mark_as_read_notify', $item->id) . '">
                        <div class="kt-notification__item-icon">
                            <i class="flaticon-interface-2 kt-font-success"></i>
                        </div>
                        <div class="kt-notification__item-details">
                            <div class="kt-notification__item-title">
                                ' . $text . '
                            </div>
                            <div class="kt-notification__item-time">
                                ' . $time . '
                            </div>
                        </div>
                    </a>';
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
                $html = $html .= '</div>';
                return $html;
            })->toArray();

            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => User::count()
            ];

            return response()->json([
                'meta' => $meta,
                'data' => $data
            ]);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            $meta = [
                'page' => $pagination['page'],
                'pages' => 4,
                'perpage' => $pagination['perpage'],
                'total' => User::count()
            ];

            return response()->json([
                'meta' => $meta,
                'data' => $data
            ]);
        }
    }
}
