<?php

namespace Kuroneko\User\Providers;

use App\Providers\AppServiceProvider;
use Kuroneko\Core\Supports\Helper;
use Kuroneko\Core\Traits\LoadAndPublicTrait;

class UserServiceProvider extends AppServiceProvider
{
    use LoadAndPublicTrait;

    public function boot()
    {
        Helper::autoLoad(__DIR__ . '/../../helpers');

        $this->setNameSpace('user')
            ->loadAndPublicConfigs(['auth'])
            ->applyConfig('user.auth', 'auth')
            ->loadCommands()
            ->loadRoute(['web'])
            ->loadMigration()
            ->loadView()
            ->loadLang();
    }

    public function register()
    {

    }
}
