<?php

namespace Kuroneko\Core\Providers;

use App\Providers\AppServiceProvider;
use Kuroneko\Core\Supports\Helper;
use Kuroneko\Core\Traits\LoadAndPublicTrait;

/**
 * Class CoreServiceProvider
 * @package Kuroneko\Core\Providers
 * @author Giang Nguyen
 */
class CoreServiceProvider extends AppServiceProvider
{
    use LoadAndPublicTrait;

    public function boot()
    {
        Helper::autoLoad(__DIR__ . '/../../helpers');

        $this->setNameSpace('core')
            ->loadAndPublicConfigs(['app'])
            ->applyConfig('core.app', 'app')
            ->loadCommands()
            ->loadLang();
    }

    public function register()
    {

    }
}
