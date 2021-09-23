<?php

namespace Kuroneko\Comment\Providers;

use App\Providers\AppServiceProvider;
use Kuroneko\Core\Supports\Helper;
use Kuroneko\Core\Traits\LoadAndPublicTrait;

class CommentServiceProvider extends AppServiceProvider
{
    use LoadAndPublicTrait;

    public function boot()
    {
        Helper::autoLoad(__DIR__ . '/../../helpers');

        $this->setNameSpace('comment')
            ->loadAndPublicConfigs(['comment'])
            ->applyConfig('comment.comment', 'comment')
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
