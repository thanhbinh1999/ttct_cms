<?php

namespace Kuroneko\Ttct\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Kuroneko\Core\Traits\CurlTrait;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\User\Classes\DataProviders\User\UserDataProvider;

/**
 * Class DashboardController
 * @package Kuroneko\Ttct\Http\Controllers
 */
class DashboardController extends Controller
{
    use CurlTrait, WriteLogTrait;

    /**
     * @var UserDataProvider
     */
    private $userDataProvider;

    /**
     * DashboardController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->clientInit();
        $this->userDataProvider = app()->make(UserDataProvider::class);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        set_page_title('Bảng điều khiển');
        $users = $this->userDataProvider->getListUser(1, 1000, ['not_in_role' => [1]]);

        $users = collect($users['data'])->map(function ($user) {
            return [
                'id' => $user['id'],
                'username' => $user['username'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'role' => $user['role'],
            ];
        })->toArray();

        $listUrl = [
            'datatable' => route('ttct.articles.datatable'),
            'datatable-publish' => route('ttct.articles.datatable'),
            'store-transfer' => route('ttct.article_transfer.store_transfer'),
            'get-data-analytic' => route('ttct.dashboard.get_data_analytic'),
            'show' => route('ttct.articles.article_pending_show'),
        ];
        return view('ttct::dashboard.index', compact('listUrl', 'users'));
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDataAnalytic(Request $request)
    {
        try {
            $url = $this->getBaseUrl() . '/be/get-data-analytic';
            $res = $this->execPost($url, $request->all());
            return response()->json($res['res'], $res['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([]);
        }
    }
}
