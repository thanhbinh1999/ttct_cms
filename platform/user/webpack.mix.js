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

mix.js('platform/user/resources/assets/js/pages/users-index.js', 'public/assets/js/pages');
mix.js('platform/user/resources/assets/js/pages/users-create.js', 'public/assets/js/pages');
mix.js('platform/user/resources/assets/js/pages/users-profile.js', 'public/assets/js/pages');
mix.js('platform/user/resources/assets/js/pages/notify-index.js', 'public/assets/js/pages');
