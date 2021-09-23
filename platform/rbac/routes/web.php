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

Route::group(['middleware' => ['web', 'menu', 'auth'], 'namespace' => 'Kuroneko\Rbac\Http\Controllers'], function () {
    Route::prefix('rbac')->group(function () {
        Route::prefix('roles')->group(function () {
            Route::get('', 'RoleController@index')->name('rbac.roles.index');
            Route::post('datatable', 'RoleController@datatable')->name('rbac.roles.datatable');
            Route::put('store', 'RoleController@store')->name('rbac.roles.store');
            Route::get('edit/{id}', 'RoleController@edit')->name('rbac.roles.edit');
            Route::put('update/{id}', 'RoleController@update')->name('rbac.roles.update');
            Route::delete('delete/{id}', 'RoleController@delete')->name('rbac.roles.delete');
            Route::post('restore/{id}', 'RoleController@restore')->name('rbac.roles.restore');

            Route::get('prepare-assign-permissions/{id}', 'RoleController@prepareAssignPermissions')->name('rbac.roles.prepare_assign_permissions');
            Route::post('update-assign-permission/{id}', 'RoleController@updateAssignPermission')->name('rbac.roles.update_assign_permission');

            Route::post('select-role', 'RoleController@select2')->name('rbac.roles.select');
        });

        Route::prefix('permissions')->group(function () {
            Route::get('', 'PermissionController@index')->name('rbac.permissions.index');
            Route::post('datatable', 'PermissionController@datatable')->name('rbac.permissions.datatable');
            Route::put('store', 'PermissionController@store')->name('rbac.permissions.store');
            Route::get('edit/{id}', 'PermissionController@edit')->name('rbac.permissions.edit');
            Route::put('update/{id}', 'PermissionController@update')->name('rbac.permissions.update');
            Route::delete('delete/{id}', 'PermissionController@delete')->name('rbac.permissions.delete');
            Route::post('restore/{id}', 'PermissionController@restore')->name('rbac.permissions.restore');
            Route::post('select2', 'PermissionController@select2')->name('rbac.permissions.select2');
        });
    });
});
