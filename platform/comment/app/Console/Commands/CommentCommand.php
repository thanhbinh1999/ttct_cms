<?php

namespace Kuroneko\Comment\Console\Commands;

use Illuminate\Console\Command;
use Kuroneko\Core\Traits\PrintLogTrait;

class CommentCommand extends Command
{
    use PrintLogTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kuroneko:comment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Module comment command';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->printMessage('green','From Comment Module: Hello there!');
    }
}
