<?php


namespace Kuroneko\Core\Console\Commands;


use Illuminate\Console\Command;
use Kuroneko\Core\Traits\PrintLogTrait;

/**
 * Class GenerateEnvFIleCommand
 * @package Kuroneko\Core\Console\Commands
 * @author Giang Nguyen
 */
class GenerateEnvFIleCommand extends Command
{
    use PrintLogTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kuroneko:env-generate
                        {--force : Force the operation to run when in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate new env file to env folder';


    /**
     * Execute the console command.
     *
     * @return boolean
     */
    public function handle()
    {
        $basePath = base_path();
        $platformPath = platform_path();
        $envPath = $basePath . DIRECTORY_SEPARATOR . 'env';
        $rootEnvPath = $basePath . DIRECTORY_SEPARATOR . '.env';
        $sourceEnvPath = $platformPath . DIRECTORY_SEPARATOR . 'core' . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'env' . DIRECTORY_SEPARATOR . '.example.env';

        if (!\File::exists($rootEnvPath)) {
            $this->printError('.env file not found in your root project');
            return false;
        }

        if (!\File::exists($envPath)) {
            \File::makeDirectory($basePath . DIRECTORY_SEPARATOR . 'env');
        }

        if (!\File::exists($envPath)) {
            $this->printError('Oop... have an error, cannot find the source env file');
            return false;
        }

        $envFile = '.' . env('APP_ENV') . '.env';

        if (\File::exists($envPath . DIRECTORY_SEPARATOR . $envFile)) {
            $confirm = $this->confirm('File ' . $envFile . ' is already exists, do you want to re-generate this?');
            if (!$confirm) return false;
        }
        \File::put($envPath . DIRECTORY_SEPARATOR . $envFile, \File::get($sourceEnvPath));

        $this->printMessage('green','Generate env file successful');
        $this->printMessage('yellow','Generate app key...');

        exec('php artisan kuroneko:key_generate');

        $this->printMessage('green','Generate app key successful');
    }
}
