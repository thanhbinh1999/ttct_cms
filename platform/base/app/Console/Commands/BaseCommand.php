<?php

namespace Kuroneko\Base\Console\Commands;

use Illuminate\Console\Command;
use Kuroneko\Core\Traits\PrintLogTrait;

class BaseCommand extends Command
{
    use PrintLogTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kuroneko:base';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Module base command';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->printMessage('green','From Base Module: Hello there!');
    }
}
