<?php


namespace Kuroneko\Core\Console\Commands;


use Illuminate\Console\ConfirmableTrait;
use Kuroneko\Core\Console\Abstracts\CommandAbstract as Command;
use Kuroneko\Core\Traits\CommandTrait;
use Kuroneko\Core\Traits\PrintLogTrait;

/**
 * Class CreateModuleCommand
 * @package Kuroneko\Core\Console\Commands
 * @author Giang Nguyen
 */
class CreateModuleCommand extends Command
{
    use ConfirmableTrait, CommandTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kuroneko:create-module
                        {name : Module name}
                        {--force : Force the operation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new module for this platform, network connection required for update composer';

    /**
     * @return bool
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function handle()
    {
        /* only alphabet name be accepted */
        if (!preg_match('/^[a-z0-9\-]+$/i', $this->argument('name'))) {
            $this->error('Only alphabetic characters are allowed.');
            return false;
        }

        $this->confirm('Make sure your network connection is established');

        $this->printMessage('yellow', 'Generate module...');
        $this->printMessage('yellow', 'Please wait until operation complete');
        $this->printMessage();

        $module = strtolower($this->argument('name'));
        $module = str_replace('-', '_', $module);

        $exists = $this->checkModuleExists($module);

        if ($exists && !$this->option('force')) {
            $this->printError("module with name $module is already exists. if you want to re create this module, add --force option to command");
            return false;
        } else {
            $this->deleteModule($module);
        }

        $location = platform_path($module);

        /* copy template module to platform folder */
        $this->publishStubs($this->getStub(), $location);
        /* rename all file name according to module name */
        $this->renameFile($module, $location);
        /* change all file content according to module name */
        $this->replaceContent($module, $location);
        /* update composer.json file */
        if (!$exists && !$this->option('force'))
            $this->writeToComposer($module);
        /* run composer update for update project */
        exec('composer update kuroneko/'.$module.' --ignore-platform-reqs');

        $this->printMessage();
        $this->printMessage('green', 'Generate module ' . $module . ' successful!');
        $this->printMessage();
    }
}
