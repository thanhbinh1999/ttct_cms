<?php

namespace Kuroneko\Menu\Http\Middleware;

use GuzzleHttp\Client;

/**
 * Class Menu
 * @package Kuroneko\Menu\Http\Middleware
 * @author Giang Nguyen
 */
class Menu
{

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        $menus = \Cache::rememberForever('menu-admin', function () {
            $client = new Client();
            $res = $client->get(env('API_BASE_URL') . '/be/menus/get-data-admin-menu');
            $data = json_decode($res->getBody()->getContents(), true);
            return $data;
        });
        view()->share('admin_menu', $menus);
        return $next($request);
    }
}
