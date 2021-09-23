<?php

/*
|--------------------------------------------------------------------------
| Base helper
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

if (!function_exists('auth_full_name')) {

    /**
     * @return string
     */
    function auth_full_name()
    {
        $firstName = auth()->user()->first_name ?? '';
        $lastName = auth()->user()->last_name ?? '';
        return $firstName . ' ' . $lastName;
    }
}

if (!function_exists('auth_role')) {

    /**
     * @return mixed
     */
    function auth_role()
    {
        $role = auth()->user()->roles->first();
        return $role;
    }
}

if (!function_exists('auth_avatar')) {

    function auth_avatar()
    {
        return empty(auth()->user()->avatar) || empty(auth()->user()->avatar_base_url) ? env('default_auth_avatar') : auth()->user()->avatar_base_url . DIRECTORY_SEPARATOR . auth()->user()->avatar;
    }
}
if (!function_exists('detect_file_type')) {
    /**
     * @param $extension
     * @return int|null
     */
    function detect_file_type($extension)
    {
        $imageExtensions = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg', 'svgz', 'cgm', 'djv', 'djvu', 'ico', 'ief', 'jpe', 'pbm', 'pgm', 'pnm', 'ppm', 'ras', 'rgb', 'tif', 'tiff', 'wbmp', 'xbm', 'xpm', 'xwd'];
        $videoExtensions = ['mp4', 'avi', 'mkv', 'm4a'];
        if (in_array($extension, $imageExtensions)) {
            return \Kuroneko\Ttct\Classes\Constants\ResourceConstant::RESOURCE_TYPE_IMAGE;
        } else if (in_array($extension, $videoExtensions)) {
            return \Kuroneko\Ttct\Classes\Constants\ResourceConstant::RESOURCE_TYPE_VIDEO;
        } else {
            return null;
        }
    }
}
