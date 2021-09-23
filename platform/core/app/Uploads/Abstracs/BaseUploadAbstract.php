<?php

namespace Kuroneko\Core\Uploads\Abstracts;

use Carbon\Carbon;
use Illuminate\Http\UploadedFile;

/**
 * Class BaseUploadAbstract
 * @package Kuroneko\Core\Uploads\Abstracts
 * @author Giang Nguyen
 */
abstract class BaseUploadAbstract
{
    /**
     * @return array
     */
    public function getResourcePath()
    {
        $folder = env('RESOURCE_FOLDER');
        $path = $this->getPathByCurrentDate();
        return [
            'path' => $path,
            'full_path' => $folder . DIRECTORY_SEPARATOR . $path
        ];
    }

    /**
     * @return string
     */
    public function getPathByCurrentDate()
    {
        $now = Carbon::now();
        return $now->year . DIRECTORY_SEPARATOR . ($now->month < 10 ? '0' . $now->month : $now->month) . DIRECTORY_SEPARATOR . ($now->day < 10 ? '0' . $now->day : $now->day);
    }

    /**
     * @param UploadedFile $file
     * @param null $name
     * @return array
     */
    public function upload(UploadedFile $file, $name = null)
    {
        $path = $this->getResourcePath();

        if (!\File::exists(res_path($path['full_path'])))
            \File::makeDirectory(res_path($path['full_path']), 0777, true);

        $name = time() . rand(1111, 9999) . '-' . \Str::slug(($name ? $name : pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)));

        $newName = $name . '.' . $file->getClientOriginalExtension();

        $file->move(res_path($path['full_path']), $newName);

        return [
            'absolute_url' => $path['path'] . DIRECTORY_SEPARATOR . $newName,
            'type' => detect_file_type($file->getClientOriginalExtension()),
            'size' => $file->getSize(),
            'name' => $name
        ];
    }

}
