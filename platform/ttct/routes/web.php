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


Route::group(['middleware' => ['web', 'menu', 'auth'], 'namespace' => 'Kuroneko\Ttct\Http\Controllers'], function () {

    Route::get('', 'DashboardController@index')->name('ttct.dashboard');
    Route::post('get-data-analytic', 'DashboardController@getDataAnalytic')->name('ttct.dashboard.get_data_analytic');

    /**
     * @description Route for article
     */
    Route::prefix('articles')->group(function () {
        /* Show */
        Route::get('article-published', 'ArticleController@indexPublished')->name('ttct.articles.article_publish_show');
        Route::get('article-draft', 'ArticleController@indexDraft')->name('ttct.articles.article_draft_show');
        Route::get('article-pending', 'ArticleController@indexPending')->name('ttct.articles.article_pending_show');
        Route::get('article-take-down', 'ArticleController@indexTakeDown')->name('ttct.articles.article_take_down_show');
        Route::get('article-delete', 'ArticleController@indexDelete')->name('ttct.articles.article_delete_show');
        Route::get('create', 'ArticleController@create')->name('ttct.articles.create');
        Route::get('edit/{id}', 'ArticleController@edit')->name('ttct.articles.edit');
        Route::post('post-data-preview', 'ArticleController@postDataPreview')->name('ttct.articles.post_data_preview');
        Route::get('preview', 'ArticleController@preview')->name('ttct.article.preview');
        Route::get('article-for-me', 'ArticleController@indexArticleForMe')->name('ttct.articles.article_for_me');
        Route::get('article-send-history', 'ArticleController@indexArticleSendHistory')
            ->name('ttct.articles.article_send_history');
        Route::get('article-send-back', 'ArticleController@indexArticleSendBack')->name('ttct.articles.article_send_back');
        Route::get('article-send-by-role', 'ArticleController@indexArticleSendByRole')
            ->name('ttct.articles.article_send_by_role');

        /* ajax */
        Route::get('set-priority', 'ArticleController@showSetPriority')->name('ttct.articles.set_priority');
        Route::post('check-time', 'ArticleController@checkTime')->name('ttct.articles.check_time');
        Route::post('select-article-for-edit-topical', 'ArticleController@selectArticleForEditTopical')
            ->name('ttct.articles.select_article_for_edit_topical');
        Route::post('get-many-article-for-edit-topical', 'ArticleController@getManyArticleForEditTopical')
            ->name('ttct.articles.get_many_article_for_edit_topical');
        Route::get('get-data-edit/{id}', 'ArticleController@getDataEdit')->name('ttct.articles.get_data_edit');
        Route::post('store', 'ArticleController@store')->name('ttct.articles.store');
        Route::post('update/{id}', 'ArticleController@update')->name('ttct.articles.update');
        Route::post('update-and-publish/{id}', 'ArticleController@updateAndPublish')->name('ttct.articles.update_and_publish');
        Route::post('update-status/{id}', 'ArticleController@updateStatus')->name('ttct.articles.update_status');
        Route::post('datatable-for-draft', 'ArticleController@datatableForDraft')->name('ttct.articles.datatable_for_draft');
        Route::post('datatable', 'ArticleController@datatable')->name('ttct.articles.datatable');
        Route::post('update-article-editor/{id?}', 'ArticleController@updateArticleEditor')
            ->name('ttct.articles.update_article_editor');
        Route::post('update-priority-one/{id?}', 'ArticleController@updatePriorityOne')
            ->name('ttct.articles.update_priority_one');
        Route::post('delete-post-permission', 'ArticleController@deletePostPermission')->name('ttct.delete.post.permission');
        Route::post('related-select-list', 'ArticleController@showRelatedArticle')->name('ttct.related.article.select');
        Route::post('select-article-category', 'ArticleController@selectAricleCategory')->name('ttct.articles.select_article_category');
        Route::post('update-article-category/{id?}', 'ArticleController@updateArticleCategoryPublished')->name('ttct.articles.update_article_category');
        Route::post('update-article-theme-published/{id?}', 'ArticleController@updateArticleThemePublished')->name('ttct.article.update_article_theme_published');
    });
    /**
     *  history  route 
     */

    Route::prefix('historys')->group(function () {
        /**
         * show  view 
         */
        Route::get('article-history', 'ArticleHistoryController@indexHistory')->name('ttct.historys.article.show');
        // end show view


        /**
         * ajax
         */
        Route::post('datatable', 'ArticleHistoryController@datatable')->name('ttct.historys.article.datatable');

        // end ajax
    });

    /**
     * @description Route for author
     */

    Route::prefix('author')->group(function () {
        Route::GET('author-lists', 'authorController@index')->name('ttct.author_show');
        Route::POST('author-api', 'authorController@call_api')->name('ttct.author.api');
        Route::POST('update', 'authorController@update')->name('ttct.author.update');
        Route::POST('list-article-by-author', 'authorController@getListArticleByAuthor')->name('ttct.author.list_article_by_author');
    });

    /**
     * @description Route for article transfer
     */
    Route::prefix('article-transfer')->group(function () {
        Route::post('update-article-transfer-status/{id}', 'ArticleTransferController@updateArticleTransferStatus')
            ->name('ttct.article_transfer.update_article_transfer_status');
        Route::post('store-transfer', 'ArticleTransferController@storeTransfer')->name('ttct.article_transfer.store_transfer');
        Route::get('get-transfer/{id}', 'ArticleTransferController@getTransfer')->name('ttct.article_transfer.get_transfer');
        Route::post('datatable', 'ArticleTransferController@datatable')->name('ttct.article_transfer.datatable');
    });

    /**
     * @description Route for resource
     */
    Route::prefix('resources')->group(function () {
        Route::post('datatable', 'ResourceController@datatable')->name('ttct.resources.datatable');
        Route::get('get-detail/{id?}', 'ResourceController@getDetail')->name('ttct.resources.get_detail');
        Route::post('store-multi', 'ResourceController@storeMulti')->name('ttct.resources.store_multi');
        Route::post('delete-article-resource', 'ResourceController@deleteArticleResource')->name('ttct.resources.delete_article_resource');
        Route::post('update-article-resource', 'ResourceController@updateOrAddResourceArticle')->name('ttct.resources.update_article_resource');
        Route::post('update-description-resource', 'ResourceController@updateDescriptionResource')->name('ttct.resources.update_description_resource');
    });

    /**
     * @description Route for category
     */
    Route::prefix('categories')->group(function () {
        Route::get('', 'CategoryController@showCategory')->name('ttct.categories.show_category');
        Route::post('datatable', 'CategoryController@datatable')->name('ttct.categories.datatable');
        Route::get('edit/{id}', 'CategoryController@edit')->name('ttct.categories.edit');
        Route::post('update/{id}', 'CategoryController@update')->name('ttct.categories.update');
        Route::post('store', 'CategoryController@store')->name('ttct.categories.store');
        Route::post('restore/{id}', 'CategoryController@restore')->name('ttct.categories.restore');
        Route::delete('delete/{id}', 'CategoryController@delete')->name('ttct.categories.delete');
        Route::post('update-status-for-topical/{id}', 'CategoryController@updateStatusForTopical')
            ->name('ttct.categories.update_status_for_topical');
        Route::get('get-detail/{id}', 'CategoryController@getDetail')->name('ttct.categories.get_detail');
        Route::post('update-topical/{id}', 'CategoryController@updateTopical')->name('ttct.categories.update_topical');

        Route::post('select-categories', 'CategoryController@selectCategory')->name('ttct.categories.select_categories');
    });

    /**
     * @description Route for topical
     */
    Route::prefix('topical')->group(function () {
        Route::get('', 'CategoryController@showTopical')->name('ttct.topical.show_topical');
        Route::get('edit/{id}', 'CategoryController@editTopical')->name('ttct.topical.edit');
        Route::get('preview/{type}', 'CategoryController@previewEditTopical')->name('ttct.topical.preview');
        Route::get('preview/{type}/detail/{id}', 'CategoryController@previewEditTopicalDetail')
            ->name('ttct.topical.preview_detail');
        Route::get('demo/{type}', 'CategoryController@demoTopical')->name('ttct.topical.demo');
        Route::get('demo/{type}/detail', 'CategoryController@demoTopicalDetail')->name('ttct.topical.demo_detail');
        Route::POST('/change-highlight', 'CategoryController@changeHighlight');
    });

    /**
     * @description Route for tag & theme
     */
    Route::prefix('tags')->group(function () {
        Route::get('article-tag', 'TagController@showTagIndex')->name('ttct.tags.show_tag');
        Route::get('article-theme', 'TagController@showThemeIndex')->name('ttct.tags.show_theme');
        Route::post('datatable', 'TagController@datatable')->name('ttct.tags.datatable');
        Route::get('edit/{id}', 'TagController@edit')->name('ttct.tags.edit');
        Route::post('update/{id}', 'TagController@update')->name('ttct.tags.update');
        Route::delete('delete/{id}', 'TagController@delete')->name('ttct.tags.delete');
        Route::post('restore/{id}', 'TagController@restore')->name('ttct.tags.restore');
        Route::post('store', 'TagController@store')->name('ttct.tags.store');
        Route::post('update-theme/{id}', 'TagController@updateTheme')->name('ttct.tags.update_theme');
        Route::post('store-theme', 'TagController@storeTheme')->name('ttct.tags.store_theme');
        Route::post('select-tag', 'TagController@selectTag')->name('ttct.tags.select_tag');
        Route::post('store-tag-for-create-update-article', 'TagController@storeTagForCreateUpdateArticle')
            ->name('ttct.tags.store_tag_for_create_update_article');
        Route::post('store-theme-for-create-update-article', 'TagController@storeThemeForCreateUpdateArticle')
            ->name('ttct.tags.store_theme_for_create_update_article');
    });

    /**
     * @description Route for reserve papers
     */
    Route::prefix('reserve-papers')->group(function () {
        Route::get('', 'ReservePaperController@index')->name('ttct.reserve_paper.index');
        Route::get('edit/{id}', 'ReservePaperController@edit')->name('ttct.reserve_paper.edit');
        Route::get('get-data-edit/{id}', 'ReservePaperController@getDataEdit')->name('ttct.reserve_paper.get_data_edit');
        Route::post('store', 'ReservePaperController@store')->name('ttct.reserve_paper.store');
        Route::post('datatable', 'ReservePaperController@datatable')->name('ttct.reserve_paper.datatable');
        Route::post('update-status/{id}', 'ReservePaperController@updateStatus')->name('ttct.reserve_paper.update_status');
        Route::post('update/{id}', 'ReservePaperController@update')->name('ttct.reserve_paper.update');
    });

    /**
     *@description Route kho-bao-giay
     */
    Route::prefix('kho-bao-giay')->group(function () {
        Route::get('', 'AtexController@index')->name('ttct.kho_bao_giay_show');
        Route::post('Call-Api', 'AtexController@data')->name('ttct::kho-bao-giay_api');
        Route::get("transfer-draft", 'AtexController@transferDraft');
        Route::get('delete/{id}/page/{page}', 'AtexController@delete');
        Route::post("search", 'AtexController@search');
    });
});

