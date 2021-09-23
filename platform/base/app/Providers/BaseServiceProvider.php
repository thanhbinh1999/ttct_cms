<?php

namespace Kuroneko\Base\Providers;

use App\Providers\AppServiceProvider;
use Kuroneko\Base\Http\Middleware\Authenticate;
use Kuroneko\Base\Http\Middleware\RedirectIfAuthenticated;
use Kuroneko\Core\Supports\Helper;
use Kuroneko\Core\Traits\LoadAndPublicTrait;
use Kuroneko\Menu\Http\Middleware\Menu;

class BaseServiceProvider extends AppServiceProvider
{
    use LoadAndPublicTrait;

    public function boot()
    {
        Helper::autoLoad(__DIR__ . '/../../helpers');

        $this->setNameSpace('base')
            ->loadAndPublicConfigs(['base'])
            ->applyConfig('base.base', 'base')
            ->loadCommands()
            ->loadRoute(['web'])
            ->loadMigration()
            ->loadView()
            ->loadLang();

        $this->app['router']->aliasMiddleware('auth', Authenticate::class);
        $this->app['router']->aliasMiddleware('menu', Menu::class);
        $this->app['router']->aliasMiddleware('guest', RedirectIfAuthenticated::class);

    }

    public function register()
    {

    }
}
