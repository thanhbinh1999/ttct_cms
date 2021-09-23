<?php

namespace Kuroneko\Core\Facades;

use Illuminate\Support\Facades\Facade;
use Kuroneko\Core\Supports\PageTitle;

/**
 * Class PageTitleFacade
 * @package Kuroneko\Core\Facades
 * @author Giang Nguyen
 */
class PageTitleFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return PageTitle::class;
    }
}
