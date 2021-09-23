<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>  
  
## Laravel microsite base on Laravel Framework  
  
### Generate env file  
Make sure .env file in your root project folder is exists with content  
```  
APP_ENV=<your-enviroment>  
```  
Then run the command to generate env file.
a new enviroment file will be created in /env folder

If provide --force option the command will generate new file regardless of the /env/.<your-enviroment>.env is already exists or not  
  
```  
php artisan kuroneko:env_generate --force  
```  
### Generate app key  
If the /env/.<your-enviroment>.env is already exists and you just want to generate new application key, run this command  
```  
php artisan kuroneko:key_generate  
```  
  
### Generate new platform module  
  
Module is a part of your application response for one or several certain functions.  
  
Eg:   
  
You want to create module ***user*** for manage user on your application,   
  
or ***acl*** for manage access control, .etc  
  
Command need argument **name** for run. If you provide --force option it will create module regardless of module is already exists or not  
```  
php artisan kuroneko:create_module <name> --force  
```  
Command will auto create new module with helper, config, routes, migrate, queue, command. Let's dig in!  
  
### RabbitMQ  
  
Platform support Rabbitmq with RabbitMQAbstract class in platform/core/Queues/Abstracts/RabbitMQAbstract.  
  
Just create new Class extend RabbitMQAbstract and provide server parameter for run  
  
```php  
use Kuroneko\Core\Queues\Abstracts\RabbitMQAbstract;  
  
class FrontendQueue extends RabbitMQAbstract  
{  
    public function __construct()  
    {  
        parent::__construct(  
            env('FRONTEND_QUEUE_HOST'),  
            env('FRONTEND_QUEUE_PORT'),  
            env('FRONTEND_QUEUE_USER'),  
            env('FRONTEND_QUEUE_PASS'),  
            env('FRONTEND_QUEUE_VHOST')  
        );  
    }  
}  
  
```  
  
Publish message  
  
```php  
use Kuroneko\Test\Queues\FrontendQueue;  
  
public function sendQueue($data)  
{  
    $frontendQueue = new FrontendQueue();  
  
    $frontendQueue->publish(  
        serialize($data),  
        'exchange.name',  
        'example.key',  
        true  
    );  
}  
```  
  
Consume message:   
  
You can create new command in your module to run it  
  
Eg:  
```php  
namespace Kuroneko\Test\Console\Commands;  
  
use Illuminate\Console\Command;  
use Kuroneko\Test\Queues\FrontendQueue;  
use Kuroneko\Test\Queues\Traits\QueueTrait;  
use Kuroneko\Core\Traits\PrintLogTrait;  
use Kuroneko\Core\Queues\Traits\QueueTrait  
  
class TestWorkerCommand extends Command  
{  
  
    use QueueTrait, PrintLogTrait;  
    /**  
     * The name and signature of the console command.  
     *  
     * @var string  
     */  
    protected $signature = 'test:worker_start';  
  
    /**  
     * The console command description.  
     *  
     * @var string  
     */  
    protected $description = 'Run test worker';  
  
    /**  
     * Create a new command instance.  
     *  
     * @return void  
     */  
    public function __construct()  
    {  
        parent::__construct();  
    }  
  
    /**  
     * Execute the console command.  
     *  
     * @return mixed  
     */  
    public function handle()  
    {  
  
        $frontendQueue = new FrontendQueue();  
        $callable = [&$this, 'process'];  
        $frontendQueue->consume(  
            'exchange.name',  
            'example.key',  
            $callable  
        );  
    }  
  
    public function process($msg)  
    {  
        // do something here  
        $this->processDone($msg);  
    }  
  
}  
  
```  
  
 Then add command to your module Provider class  
   
 ```php  
->loadCommands([  
    // other command,  
    'Kuroneko\Test\Console\Commands\TestWorkerCommand'  //here  
])  
  
```  
All complete, just run  
 ```  
php artisan test:worker_start  
```  
  
### Provider AutoLoad  

You can read platform/core/app/Traits/LoadAndPublicTrait for more detail  
Use this trait in your module Provider class

#### Methods:  
  
| Method   |      argument      |  Description |  
|----------|:-------------:|------|  
| setNameSpace |  `string` $namespace|Set module namespce |  
| getDotNamespace |       |  Get module name space as string with dots separation  |  
| loadAndPublicConfigs | `array - string` $fileNames | Load config to app config from `your-module/config` |
| applyConfig | `string` $from, `string` $to| Replace config with config in your app |
| loadView |  | Load module view from `your-module/resources/view` |
| loadLang |  | Load module language from `your-module/resources/lang`|
| loadRoute | `array - string` $fileNames | Load module route from `your-module/routes |
| loadMigration |  | Load module miggration from `your-module/database/migrations` |
| applyMiddleware | `string` $alias, `string` $class  | Add middleware to app router |
| loadFactory | `string` $path | Load module factory from `your-module/database/factories`|
| publishAssets | `string` $assetPath, `string` $publishPath, `String` $group | Publish asset from your module to public folser |
| loadCommands | `string - array` $commands | Load your module command to app command |


### Eloquent Repository

By default, platform support Laravel Eloquent by EloquentRepositoryAbstract.

You can read platform/core/app/Repositories/Abstracts/EloquentRepositoryAbstract for more detail  

---

Create your own RepositoryClass extend from EloquentRepositoryAbstract

Eg:

Create interface
```php

namespace Kuroneko\Test\Repositories\Interfaces;

interface UserRepositoryInterface
{
    // define User repository addition method
}

```

Create Repository Class

Eloquent Repository need Model as argument. You can create new Model in `your-module/app/Models`
```php
use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\Test\Repositories\Interfaces\UserRepositoryInterface;
use Kuroneko\Test\Models\User;

class UserRepository extends EloquentRepositoryAbstract implements UserRepositoryInterface
{
    public function __construct(User $user)
    {
        parent::__construct($user);
    }
    // your addition method here
}

```

#### Eloquent Repository default methods:

| Method   |      argument      |  Description |  
|----------|:-------------------|--------------|
| setModel | $model | set model to repository |
| getModel |  | get repository model |
| findById | $id, `array` $with, `array` $select| find model by id |
| findManyById | `array` $ids, `array` $with, `array` $select, $orderBy | find models by list ids |
| findOrFail | $id, `array` $with, `array` $select | find model by id. if model not found then throw `ModelNotFoundException` |
| all | `array` $with, `array` $select, $orderBy | get all models |
| allBy | `array` $conditions, `array` $with, `array` $select, $orderBy | get all model by conditions |
| firstBy | `array` $conditions, `array` $with, `array` $select | get first model that match the condition |
| count | `array` $conditions | count all models that match condition |
| max | `string` $column, `array` $conditions | get max for column that match condition |
| insert | `array` $attribute | Insert new Model to database |
| firstOrCreate | `array` $attribute |  Get the first record matching the attributes or create it. |
| firstOrNew | `array` $attribute | Get the first record matching the attributes or instantiate it. |
| updateOrCreate | `array` $attributes | Create or update a record matching the attributes, and fill it with values. |
| update | $id, `array` $attributes | Run an update statement against the database. |
| updateMany | $ids, array $attributes | Update many model with attributes |
| delete | $id | Delete model from database |
| deleteMany | $ids | Delete many models from database |
