/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous',
        adarta: '../lib/adarta',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-polyfills': '../lib/famous-polyfills/index'
    },
    packages: [

    ]
});
require(['main']);
