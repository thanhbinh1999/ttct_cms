<?php

/*
|--------------------------------------------------------------------------
| Ttct helper
|--------------------------------------------------------------------------
|
*/

// define your helper function here

if (!function_exists('platform_path')) {

    /**
     * @param null $path
     * @return string
     */
    function platform_path($path = null)
    {
        return __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $path;
    }
}
