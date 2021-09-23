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

Route::group(['middleware' => ['web', 'menu', 'auth'], 'namespace' => 'Kuroneko\Comment\Http\Controllers'], function () {

    Route::prefix('comments')->group(function () {
        Route::get('show-verify', 'CommentController@showVerify')->name('comments.show_verify');
        Route::get('show-publish', 'CommentController@showPublish')->name('comments.show_publish');
        Route::get('show-published', 'CommentController@showPublished')->name('comments.show_published');
        Route::get('show-auto-check', 'CommentController@showAutoCheck')->name('comments.show_auto_check');
        Route::get('show-deleted', 'CommentController@showDeleted')->name('comments.show_deleted');
        Route::get('show-reported', 'CommentController@showReported')->name('comments.show_reported');
        Route::get('comment-by-article/{id}', 'CommentController@showCommentByArticle')->name('comments.show_comment_by_article');

        Route::get('show-report/total-comment', 'CommentController@showReportTotalComment')->name('comments.show_report.total_comment');
        Route::get('show-report/count-comment-be-processed-by-user-cms', 'CommentController@showReportCountCommentBeProcessedByUserCms')->name('comments.show_report.count_comment_be_processed_by_user_cms');
        Route::get('show-report/count-comment-by-list-cat', 'CommentController@showReportCountCommentByListCat')->name('comments.show_report.count_comment_by_list_cat');
        Route::get('show-report/most-comment-by-author', 'CommentController@showReportCountCommentByAuthor')->name('comments.show_report.most_comment_by_author');
        Route::get('show-report/most-comment-published', 'CommentController@showReportMostCommentPublished')->name('comments.show_report.most_comment_published');
        Route::get('show-report/most-comment', 'CommentController@showReportMostComment')->name('comments.show_report.most_comment');

        Route::post('datatable', 'CommentController@datatable')->name('comments.datatable');
        Route::post('comment-by-article', 'CommentController@commentByArticle')->name('comments.comment_by_article');

        Route::get('get-log-comment/{id}', 'CommentController@getLogComment')->name('comments.get_log_comment');
        Route::post('get-count-comment', 'CommentController@getCountComment')->name('comments.get_count_comment');

        Route::post('verify', 'CommentController@verify')->name('comments.verify');
        Route::post('publish', 'CommentController@publish')->name('comments.publish');
        Route::post('send-back', 'CommentController@sendBack')->name('comments.send_back');
        Route::post('delete', 'CommentController@delete')->name('comments.delete');
        Route::post('restore', 'CommentController@restore')->name('comments.restore');
        Route::post('update-content-and-author', 'CommentController@updateContentAndAuthor')->name('comments.update_comment_and_author');
        Route::post('update-report-comment', 'CommentController@updateReportComment')->name('comments.update_report_comment');
        Route::post('most-count-comment', 'CommentController@mostCountComment')->name('comments.most_count_comment');
        Route::post('count-comment-be-processed-by-user-cms-of-list-user-by-list-status', 'CommentController@getCountCommentBeProcessedByUserCmsOfListUserByListStatus')->name('comments.count_comment_be_processed_by_user_cms_of_list_user_by_list_status');
        Route::post('count-comment-of-list-cat-by-list-status', 'CommentController@countCommentOfListCatByListStatus')->name('comments.count_comment_of_list_cat_by_list_status');
        Route::post('most-comment-by-author', 'CommentController@countCommentByAuthor')->name('comments.most_comment_by_author');
        Route::post('most-comment-published', 'CommentController@mostCommentPublished')->name('comments.most_comment_published');
    });


    Route::prefix('sticker-themes')->group(function () {
        Route::get('', 'StickerThemeController@index')->name('comments.sticker_themes.sticker_themes_show');

        Route::post('create-sticker-theme', 'StickerThemeController@store')->name('comments.sticker_themes.store');
        Route::post('datatable', 'StickerThemeController@datatable')->name('comments.sticker_themes.datatable');
        Route::get('get-list-sticker-theme', 'StickerThemeController@getListStickerTheme')->name('comments.sticker_themes.get_list_sticker_theme');

        Route::get('edit/{id}', 'StickerThemeController@edit')->name('comments.sticker_themes.edit');
        Route::post('update/{id}', 'StickerThemeController@update')->name('comments.sticker_themes.update');
        Route::post('delete/{id}', 'StickerThemeController@delete')->name('comments.sticker_themes.delete');
        Route::post('restore/{id}', 'StickerThemeController@restore')->name('comments.sticker_themes.restore');
    });

    Route::prefix('stickers')->group(function () {
        Route::get('', 'StickerController@index')->name('comments.stickers.sticker_show');
        Route::post('datatable', 'StickerController@datatable')->name('comments.stickers.datatable');
        Route::get('edit/{id}', 'StickerController@edit')->name('comments.stickers.edit');
        Route::post('update/{id}', 'StickerController@update')->name('comments.stickers.update');
        Route::post('store', 'StickerController@store')->name('comments.stickers.store');
        Route::post('delete/{id}', 'StickerController@delete')->name('comments.stickers.delete');
        Route::post('restore/{id}', 'StickerController@restore')->name('comments.stickers.restore');
    });

    Route::prefix('black-keys')->group(function () {
        Route::get('', 'BlackKeyController@index')->name('comments.black_keys.index');
        Route::post('datatable', 'BlackKeyController@datatable')->name('comments.black_keys.datatable');
        Route::post('store', 'BlackKeyController@store')->name('comments.black_keys.store');
        Route::delete('delete/{id}', 'BlackKeyController@delete')->name('comments.black_keys.delete');
    });

});

