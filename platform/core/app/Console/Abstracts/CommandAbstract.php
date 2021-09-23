<?php

namespace Kuroneko\Core\Console\Abstracts;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use League\Flysystem\FileNotFoundException;

/**
 * Class CommandAbstract
 * @package Kuroneko\Core\Console\Abstracts
 * @author Giang Nguyen
 */
abstract class CommandAbstract extends Command
{

    /**
     * @param $module
     * @return bool
     */
    protected function checkModuleExists($module)
    {
        return in_array($module, scan_folder(platform_path()));
    }

    /**
     * Delete
     * @param $module
     * @return bool
     */
    protected function deleteModule($module)
    {
        if (\File::exists(platform_path($module))) {
            return \File::deleteDirectory(platform_path($module));
        }
        return false;
    }

    /**
     * Generate the module in Modules directory.
     * @param $from
     * @param $to
     * @author Giang Nguyen
     */
    protected function publishStubs(string $from, string $to)
    {
        try {
            if (\File::isDirectory($from)) {
                $this->publishDirectory($from, $to);
            } else {
                \File::copy($from, $to);
            }
        } catch (FileNotFoundException $exception) {

        }
    }

    /**
     * Copy the directory to the given directory.
     *
     * @param string $from
     * @param string $to
     * @return void
     * @author Giang Nguyen
     */
    protected function publishDirectory($from, $to)
    {
        \File::copyDirectory($from, $to);
    }

    /**
     * @return string
     */
    protected function getStub()
    {
        return platform_path('core/app/Stub');
    }

    /**
     * @param $pattern
     * @param $location
     * @return bool
     */
    protected function renameFile($pattern, $location)
    {
        $paths = scan_folder($location);

        if (empty($paths)) {
            return false;
        }
        foreach ($paths as $path) {
            $path = $location . DIRECTORY_SEPARATOR . $path;

            $newPath = $this->transformFileName($pattern, $path);

            rename($path, $newPath);

            $this->renameFile($pattern, $newPath);
        }
        return true;
    }

    /**
     * @param $pattern
     * @param $path
     * @return mixed
     */
    protected function transformFileName($pattern, $path)
    {
        $replacements = $this->replacements($pattern);

        return str_replace(
            array_keys($replacements),
            array_values($replacements),
            $path
        );
    }

    /**
     * @param string $replaceText
     * @return array
     */
    public function replacements(string $replaceText)
    {
        return [
            '{-module}' => strtolower($replaceText),
            '{module}' => Str::snake(str_replace('-', '_', $replaceText)),
            '{module-}' => Str::snake(str_replace('_', '-', $replaceText)),
            '{+module}' => Str::camel($replaceText),
            '{modules}' => Str::plural(Str::snake(str_replace('-', '_', $replaceText))),
            '{-modules}' => Str::plural($replaceText),
            '{MODULE}' => strtoupper(Str::snake(str_replace('-', '_', $replaceText))),
            '{Module}' => ucfirst(Str::camel($replaceText)),
            'composer.stub' => 'composer.json',
            '.stub' => '.php',
            '{migrate_date}' => now(config('app.timezone'))->format('Y_m_d_His'),
        ];
    }

    /**
     * @param $pattern
     * @param $location
     * @return bool
     */
    public function replaceContent($pattern, $location)
    {
        $replacements = $this->replacements($pattern);

        $paths = scan_folder($location);

        if (empty($paths)) {
            return false;
        }

        foreach ($paths as $path) {
            $path = $location . DIRECTORY_SEPARATOR . $path;
            if (\File::isDirectory($path)) {
                $this->replaceContent($pattern, $path);
            } else {
                $content = \File::get($path);
                $content = str_replace(
                    array_keys($replacements),
                    array_values($replacements),
                    $content
                );
                \File::put($path, $content);
            }
        }
        return true;
    }

    /**
     * @param $module
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function writeToComposer($module)
    {
        $replacements = $this->replacements($module);
        $file = \File::get(base_path('composer.json'));
        $file = (array)json_decode($file);
        $file['repositories'][] = [
            'type' => 'path',
            'url' => './platform/' . $module
        ];
        $require = (array)$file['require'];
        $require['kuroneko/' . $module] = '*@dev';
        $file['require'] = $require;
        \File::put(base_path('composer.json'), json_encode($file));
    }
}
