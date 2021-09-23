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
mix.js('platform/comment/resources/assets/js/pages/comment/comment-verify.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-publish.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-published.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-auto-check.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-deleted.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-reported.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-report-total-comment.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-report-count-comment-be-processed-by-user-cms.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-report-comment-of-list-cat-by-list-status.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-report-comment-by-author.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-report-most-comment-published.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-report-most-comment.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/comment/comment-by-article.js', 'public/assets/js/pages');

mix.js('platform/comment/resources/assets/js/pages/sticker-theme/sticker-theme-index.js', 'public/assets/js/pages');
mix.js('platform/comment/resources/assets/js/pages/sticker/sticker-index.js', 'public/assets/js/pages');

mix.js('platform/comment/resources/assets/js/pages/black-key/black-key-index.js', 'public/assets/js/pages');
