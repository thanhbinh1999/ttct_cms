<?php

namespace Kuroneko\Ttct\Providers;

use App\Providers\AppServiceProvider;
use Kuroneko\Core\Supports\Helper;
use Kuroneko\Core\Traits\LoadAndPublicTrait;

class TtctServiceProvider extends AppServiceProvider
{
    use LoadAndPublicTrait;

    public function boot()
    {
        Helper::autoLoad(__DIR__ . '/../../helpers');

        $this->setNameSpace('ttct')
            ->loadAndPublicConfigs(['ttct'])
            ->applyConfig('ttct.ttct', 'ttct')
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
