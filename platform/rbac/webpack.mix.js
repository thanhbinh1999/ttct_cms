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

mix.js('platform/rbac/resources/assets/js/pages/role-index.js', 'public/assets/js/pages');
mix.js('platform/rbac/resources/assets/js/pages/permission-index.js', 'public/assets/js/pages');
