<?php

/**
 * @description common helper function use for all module
 * @author Giang Nguyen
 */


if (!function_exists('platform_path')) {

    /**
     * @param null $path
     * @return string
     */
    function platform_path($path = null)
    {
        $path = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $path;
        return realpath($path) ? realpath($path) : $path;
    }
}

if (!function_exists('res_path')) {

    /**
     * @param null $path
     * @return string
     */
    function res_path($path = null)
    {
        return __DIR__ . DIRECTORY_SEPARATOR . env('RESOURCE_PATH') . $path;
    }
}

if (!function_exists('get_page_title')) {
    /**
     * @return mixed
     */
    function get_page_title()
    {
        return \Kuroneko\Core\Facades\PageTitleFacade::getTitle();
    }
}

if (!function_exists('set_page_title')) {

    /**
     * @param string $title
     * @return mixed
     */
    function set_page_title(string $title)
    {
        return \Kuroneko\Core\Facades\PageTitleFacade::setTitle($title);
    }
}

if (!function_exists('get_app_favicon')) {
    function get_app_favicon()
    {
        return config('common.app-favicon');
    }
}


if (!function_exists('scan_folder')) {
    /**1
     * @param $path
     * @param array $ignore_files
     * @return array
     */
    function scan_folder($path, $ignore_files = [])
    {
        try {
            if (is_dir($path)) {
                $data = array_diff(scandir($path), array_merge(['.', '..', '.DS_Store'], $ignore_files));
                natsort($data);
                return $data;
            }
            return [];
        } catch (Exception $ex) {
            return [];
        }
    }
}

if (!function_exists('resolve_offset')) {

    /**
     * @param $page
     * @param $perPage
     * @return float|int
     */
    function resolve_offset($page, $perPage)
    {
        return ($page != 1) ? (($page * $perPage) - ($perPage)) : 0;
    }
}

if (!function_exists('format_bytes')) {
    /**
     * @param $size
     * @param int $precision
     * @return int|string
     */
    function format_bytes($size, $precision = 2)
    {
        if ($size > 0) {
            $size = (int)$size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');

            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        } else {
            return $size;
        }
    }
}
