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

mix.js('platform/menu/resources/assets/js/pages/menu-index.js', 'public/assets/js/pages');
mix.js('platform/menu/resources/assets/js/pages/menu-item-index.js', 'public/assets/js/pages');
