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

Route::group(['middleware' => ['web'], 'namespace' => 'Kuroneko\User\Http\Controllers'], function () {
    Route::get('login', 'Auth\LoginController@showLoginForm')->name('user.show_login_form');
    Route::get('confirm-login', 'Auth\LoginController@showConfirmLoginForm')->name('user.show_confirm_login_form');
    Route::post('confirm-login', 'Auth\LoginController@processConfirmLogin')->name('user.confirm_login');
    Route::post('login', 'Auth\LoginController@login')->name('user.login');

    Route::middleware('auth')->group(function () {
        Route::post('logout', 'Auth\LoginController@logout')->name('user.logout');
    });

    Route::prefix('users')->middleware('menu')->group(function () {
        Route::get('', 'UserController@index')->name('users.index');
        Route::post('datatable', 'UserController@datatable')->name('users.datatable');

        Route::get('prepare-data-for-assign/{id}', 'UserController@prepareDataForAssign')->name('users.prepare_data_for_assign');
        Route::post('update-assign-role-permission/{id}', 'UserController@updateAssignRolePermission')->name('users.update_assign_role_permission');

        Route::get('create', 'UserController@create')->name('users.create');
        Route::put('store', 'UserController@store')->name('users.store');

        Route::get('profile', 'UserController@profile')->name('users.profile');
        Route::post('update-profile', 'UserController@updateProfile')->name('users.update_profile');

        Route::get('user-acl', 'UserController@getUserAcl')->name('users.user_acl');

        Route::post('select-user', 'UserController@select2')->name('users.select2');

        Route::post('send-notification', 'UserController@sendNotification')->name('users.send_notification');
        Route::post('mark-as-read-notify/{id}', 'UserController@markAsReadNotify')->name('users.mark_as_read_notify');
        Route::get('show-notify', 'UserController@showNotify')->name('users.show_notify');
        Route::post('datatable-notify', 'UserController@datatableNotify')->name('users.datatable_notify');
    });
});

