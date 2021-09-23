<?php

namespace Kuroneko\Rbac\Providers;

use App\Providers\AppServiceProvider;
use Kuroneko\Core\Supports\Helper;
use Kuroneko\Core\Traits\LoadAndPublicTrait;

class RbacServiceProvider extends AppServiceProvider
{
    use LoadAndPublicTrait;

    public function boot()
    {
        Helper::autoLoad(__DIR__ . '/../../helpers');

        $this->setNameSpace('rbac')
            ->loadAndPublicConfigs(['permission'])
            ->applyConfig('rbac.permission', 'permission')
            ->loadCommands()
            ->loadRoute(['web'])
            ->loadMigration()
            ->loadView()
            ->loadLang();
    }

    public function register()
    {
        $this->app->singleton(\Illuminate\Contracts\Debug\ExceptionHandler::class, \Kuroneko\Rbac\Exceptions\Handler::class);
    }
}
