<?php

namespace Kuroneko\Rbac\Console\Commands;

use Illuminate\Console\Command;
use Kuroneko\Core\Traits\PrintLogTrait;
use Kuroneko\Rbac\Classes\Processors\PermissionProcessor;
use Kuroneko\Rbac\Classes\Processors\RoleProcessor;

/**
 * Class BuildDataCommand
 * @package Kuroneko\Rbac\Console\Commands
 * @author Giang Nguyen
 */
class BuildDataCommand extends Command
{
    use PrintLogTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rbac:build-data {task : Task name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Module rbac command';

    /**
     * @var RoleProcessor
     */
    private $roleProcessor;

    /**
     * @var PermissionProcessor
     */
    private $permissionProcessor;

    /**
     * BuildDataCommand constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        parent::__construct();

        $this->roleProcessor = app()->make(RoleProcessor::class);
        $this->permissionProcessor = app()->make(PermissionProcessor::class);
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        switch ($this->argument('task')) {
            case 'build-elastic-roles':
            {
                $this->buildRoles();
                break;
            }
            case 'build-elastic-permissions':
            {
                $this->buildPermissions();
                break;
            }
            default:
            {
                break;
            }
        }
    }

    private function buildRoles()
    {
        $this->roleProcessor->buildElasticAllRoles();
    }

    private function buildPermissions()
    {
        $this->permissionProcessor->rebuildElasticAllPermission();
    }
}
