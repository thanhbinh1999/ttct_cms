  
<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>        
    
## About Laravel    
 Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:    
    
- [Simple, fast routing engine](https://laravel.com/docs/routing).    
- [Powerful dependency injection container](https://laravel.com/docs/container).    
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.    
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).    
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).    
- [Robust background job processing](https://laravel.com/docs/queues).    
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).    
    
Laravel is accessible, powerful, and provides tools required for large, robust applications.    
    
---    
 ## Laravel HMVC base on Laravel Framework 
 
 
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
        
You want to create module ***user*** for manage user on your application, or ***acl*** for manage access control, .etc        
        
Command need argument **name** for run. If you provide --force option it will create module regardless of module is already exists or not        
```        
php artisan kuroneko:create_module <name> --force        
```        
Command will auto create new module with helper, config, routes, migrate, queue, command. Let's dig in!        
        

        
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
  
---    
 # Deploy project ttct cms   
  
  ***Extract vendor.tar.gz first if vendor folder is not exists***      
  
 All code is in folder platform and built base on HMCV (Hierarchical model–view–controller), more detail about this use can search google :)      
And if you know Laravel, you can understand it faster :)      
      
***Module struct***:     
<p align="center"><img src="https://i.imgur.com/y401Qqo.jpg" width="400"></p>        
      
All route api for backend you can see by type command:      
```      
php arstisan r:l      
```      
      
You also must read:      
     
- https://gitlab.tuoitre.com.vn/ttct/cms/-/blob/release/master/README.md      
      
      
      
***Database for service ttct and cms ttct must be different DB***      
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