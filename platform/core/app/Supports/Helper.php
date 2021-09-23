<?php

namespace Kuroneko\Core\Supports;

/**
 * Class Helper
 * @package Kuroneko\Core\Supports
 * @author Giang Nguyen
 */
class Helper
{
    public static function autoLoad(string $path)
    {
        $files = \File::glob($path . DIRECTORY_SEPARATOR . '*.php');

        foreach ($files as $file) {
            \File::requireOnce($file);
        }
    }
}
