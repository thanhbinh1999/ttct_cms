const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('platform/ttct/resources/assets/js/pages/article-index-pending.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-draft.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-published.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-take-down.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-delete.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-for-me.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-history.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-send-back.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-send-by-role.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-create.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-edit.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/article-index-priority.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/dashboard.js', 'public/assets/js/pages');


mix.js('platform/ttct/resources/assets/js/pages/reserve-paper-index.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/reserve-paper-edit.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/categories-index.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/topical-edit.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/topical-index.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/tags-index.js', 'public/assets/js/pages');
mix.js('platform/ttct/resources/assets/js/pages/theme-index.js', 'public/assets/js/pages');

mix.js('platform/ttct/resources/assets/js/topical-preview/topical-1.js', 'public/assets/article-preview/js');
mix.js('platform/ttct/resources/assets/js/topical-preview/topical-2.js', 'public/assets/article-preview/js');
mix.js('platform/ttct/resources/assets/js/topical-preview/topical-2-detail.js', 'public/assets/article-preview/js');
mix.js('platform/ttct/resources/assets/js/pages/topical/edit-article.js', 'public/assets/js/pages/topical');
mix.js('platform/ttct/resources/assets/js/pages/topical/create-article.js', 'public/assets/js/pages/topical');

mix.js('platform/ttct/resources/assets/js/pages/header.js', 'public/assets/js/pages');
