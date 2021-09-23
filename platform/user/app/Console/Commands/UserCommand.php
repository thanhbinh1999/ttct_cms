<?php

namespace Kuroneko\User\Console\Commands;

use Illuminate\Console\Command;
use Kuroneko\Core\Traits\PrintLogTrait;
use Kuroneko\User\Classes\Processors\UserProcessor;

class UserCommand extends Command
{
    use PrintLogTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:build-data { task : Task name }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'User Build data command';

    /**
     * @var UserProcessor
     */
    private $userProcessor;

    /**
     * UserCommand constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        parent::__construct();
        $this->userProcessor = app()->make(UserProcessor::class);
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        switch ($this->argument('task')) {
            case 'build-elastic-user':
            {
                $this->buildElasticUser();
                break;
            }
            default:
            {
                break;
            }
        }
    }

    private function buildElasticUser()
    {
        $this->userProcessor->reBuildElasticAllUser();
    }
}
