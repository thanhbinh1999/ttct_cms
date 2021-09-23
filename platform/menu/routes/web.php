<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['web', 'menu', 'auth'], 'namespace' => 'Kuroneko\Menu\Http\Controllers'], function () {
    Route::prefix('menus')->group(function () {
        Route::get('', 'MenuController@index')->name('menus.index');
        Route::post('remove-cache', 'MenuController@removeCacheMenu')->name('menus.remove_cache');
        Route::post('datatable', 'MenuController@datatable')->name('menus.datatable');
        Route::get('edit/{id}', 'MenuController@edit')->name('menus.edit');
        Route::post('update/{id}', 'MenuController@update')->name('menus.update');
        
        Route::prefix('menu-items')->group(function () {
            Route::get('build-menu/{id}', 'MenuItemController@index')->name('menuitems.index');
            Route::get('select-route', 'MenuItemController@getRouteName')->name('menuitems.select_route');
            Route::get('prepare-data-build/{id}', 'MenuItemController@prepareDataBuild')->name('menuitems.prepare_data_build');
            Route::get('edit/{id?}', 'MenuItemController@edit')->name('menuitems.edit');
            Route::post('update/{id?}', 'MenuItemController@update')->name('menuitems.update');
            Route::post('store/{id}', 'MenuItemController@store')->name('menuitems.store');
            Route::delete('delete/{id?}', 'MenuItemController@delete')->name('menuitems.delete');
            Route::post('restore/{id?}', 'MenuItemController@restore')->name('menuitems.restore');
            Route::post('update-order', 'MenuItemController@updateOrder')->name('menuitems.update_order');
        });
    });
});
