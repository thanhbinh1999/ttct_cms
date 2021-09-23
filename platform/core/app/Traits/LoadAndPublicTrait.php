<?php

namespace Kuroneko\Core\Traits;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Support\ServiceProvider;

/**
 * Trait LoadAndPublicTrait
 * @package Microsite\Backend\Core
 * @mixin ServiceProvider
 * @author Giang Nguyen
 */
trait LoadAndPublicTrait
{
    /**
     * @var
     */
    public $namespace;

    /**
     * @var
     */
    public $basePath;

    /**
     * @param $namespace
     * @return $this
     */
    public function setNameSpace($namespace): self
    {
        $this->namespace = ltrim(rtrim(trim($namespace), '\\/'), '\\/');
        return $this;
    }

    /**
     * @return string
     */
    public function getNameSpace()
    {
        return str_replace('\\', '/', $this->namespace);
    }

    /**
     * @return mixed
     */
    public function getDotNamespace()
    {
        return str_replace("\\", '.', str_replace('/', '.', $this->namespace));
    }

    /**
     * @param $basePath
     * @return LoadAndPublicTrait
     */
    public function setBasePath($basePath): self
    {
        $this->basePath = $basePath;
        return $this;
    }


    /**
     * @return string
     */
    public function getBasePath()
    {
        return $this->basePath ?? platform_path();
    }

    /**
     * @param string $file
     * @return string
     */
    public function getConfigPath(string $file): string
    {
        return $this->getBasePath() . DIRECTORY_SEPARATOR .$this->getNameSpace() . '/config/' . $file . '.php';
    }

    /**
     * @param $file
     * @return string
     */
    public function getRoutePath($file): string
    {
        return $this->getBasePath() . DIRECTORY_SEPARATOR . $this->getNameSpace() . '/routes/' . $file . '.php';
    }

    /**
     * @return string
     */
    public function getViewPath()
    {
        return $this->getBasePath() . DIRECTORY_SEPARATOR. $this->getNameSpace() . '/resources/views';
    }

    /**
     * @return string
     */
    public function getLangPath()
    {
        return $this->getBasePath() . DIRECTORY_SEPARATOR .$this->getNameSpace() . '/resources/lang';
    }


    /**
     * @return string
     */
    public function getMigrationPath()
    {
        return $this->getBasePath() . DIRECTORY_SEPARATOR .$this->getNameSpace() . '/database/migrations';
    }

    /**
     * Load config of module and merge to app config
     * @param $fileNames
     * @return LoadAndPublicTrait
     */
    public function loadAndPublicConfigs($fileNames): self
    {
        if (!is_array($fileNames))
            $fileNames = [$fileNames];

        foreach ($fileNames as $fileName) {
            $this->mergeConfigFrom($this->getConfigPath($fileName), $this->getDotNamespace() . '.' . $fileName);
        }
        return $this;
    }

    /**
     * @return LoadAndPublicTrait
     */
    public function loadView(): self
    {
        $this->loadViewsFrom($this->getViewPath(), $this->getDotNamespace());
        return $this;
    }

    /**
     * @return LoadAndPublicTrait
     */
    public function loadLang(): self
    {
        $this->loadTranslationsFrom($this->getLangPath(), $this->getDotNamespace());
        return $this;
    }

    /**
     * @param $fileNames
     * @return $this
     */
    public function loadRoute($fileNames): self
    {
        if (!is_array($fileNames)) {
            $fileNames = [$fileNames];
        }
        foreach ($fileNames as $fileName) {
            $this->loadRoutesFrom($this->getRoutePath($fileName));
        }
        return $this;
    }

    /**
     * @return $this
     */
    public function loadMigration(): self
    {
        $this->loadMigrationsFrom($this->getMigrationPath());
        return $this;
    }

    /**
     * @param $alias
     * @param $class
     * @return $this
     */
    public function applyMiddleware($alias, $class): self
    {
        app()['router']->aliasMiddleware($alias, $class);
        return $this;
    }

    /**
     * @param string $path
     * @throws BindingResolutionException
     */
    protected function registerEloquentFactoriesFrom(string $path)
    {
        $this->app->make(Factory::class)->load($path);
    }

    /**
     * @param string $path
     * @return $this
     * @throws BindingResolutionException
     */
    public function loadFactory(string $path): self
    {
        $this->registerEloquentFactoriesFrom($path);
        return $this;
    }

    /**
     * @param $from
     * @param $to
     * @return $this
     */
    public function applyConfig($from, $to): self
    {
        \Config::set($to, config($from));
        return $this;
    }

    /**
     * @param string $assetPath
     * @param string $publishPath
     * @param string $group
     * @return $this
     */
    public function publishAssets(string $assetPath, string $publishPath, string $group): self
    {
        $this->publishes([
            $assetPath => public_path($publishPath),
        ], $group);
        return $this;
    }

    /**
     * @param array $commands
     * @return $this
     */
    public function loadCommands($commands = [])
    {
        $commandFiles = \File::glob($this->getCommandPath() . '*.php');
        $commandNames = preg_replace('/^(?:.*)(?:[\/|\\\])([\w]+(?:-[\w]+)*).php$/', '$1', $commandFiles);
        $moduleNamespace = $this->getModuleNamespace();
        $this->commands = array_merge(collect($commandNames)->map(function ($command) use ($moduleNamespace) {
            return 'Kuroneko\\'.$moduleNamespace.'\\Console\\Commands\\' . $command;
        })->toArray(), $commands);
        $this->commands($this->commands);
        return $this;
    }

    /**
     * @return string
     */
    private function getCommandPath(): string
    {
        return $this->getBasePath() . DIRECTORY_SEPARATOR . $this->getNameSpace() . DIRECTORY_SEPARATOR . 'app/Console/Commands' . DIRECTORY_SEPARATOR;
    }

    /**
     * @return string
     */
    private function getModuleNamespace()
    {
        return implode('\\', collect(explode('/', $this->getNameSpace()))->map(function ($str) {
            return ucfirst($str);
        })->toArray());
    }
}
