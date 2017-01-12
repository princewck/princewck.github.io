var BOWER_DIR = './bower_components';
require.config({
    baseUrl: './',
    urlArgs:"version=0.0.1",
    waitSeconds: 0,
    paths: {
        'angular': BOWER_DIR + '/angular/angular.min',
        'angular-animate': BOWER_DIR + '/angular-animate/angular-animate.min',
        'angular-moment': BOWER_DIR + '/angular-moment/angular-moment.min',
        'angular-require': BOWER_DIR + '/angular-require/angular-require.min',
        'angular-ui-router': BOWER_DIR + '/angular-ui-router/release/angular-ui-router.min',
        'angular-touch': BOWER_DIR + '/angular-touch/angular-touch.min',
        'angular-cookie': "//cdn.bootcss.com/angular.js/1.4.6/angular-cookies.min",
        'jquery': BOWER_DIR + '/jquery/dist/jquery.min',
        'moment': BOWER_DIR + '/moment/min/moment.min',
        //项目相关
        'app': './scripts/app',
        'routes': './scripts/app/routes',
        'intercepter': './scripts/app/intercepter',

        'site-nav': './directives/common_pages/header',
        'search-bar': './directives/common_pages/search-bar',
        'site-footer': './directives/common_pages/site-footer',
        //轮播图
        'kslider': './directives/common_pages/slider',
        'block-group': './directives/pages/block_group/block_group',
        'guess-you-like': './directives/pages/guess_u_like/guess_u_like'
    },
    map: {
        '*': {
            'css': '//apps.bdimg.com/libs/require-css/0.1.8/css.min.js' // or whatever the path to require-css is
        }
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular'],
            exports: 'ui-router'
        },
        'angular-moment': {
            deps: ['angular', 'moment'],
            exports: 'angular-moment'
        },
        'angular-require': {
            deps: ['angular'],
            exports: 'angular-require'
        },
        'angular-animate': {
            deps: ['angular'],
        },
        'angular-cookie': {
            deps: ['angular']
        },
        'app': {
            //files to be load before start
            deps: ['angular', 'angular-ui-router', 'angular-require', 'angular-animate', 'angular-cookie', 'angular-touch', 'css!./styles/reset.css', 'css!./styles/base.css'],
            exports: 'app'
        },
        'angular-touch': {
            deps: ['angular']
        }
    }
});

require.onError = function (err) {
    console.log("require error:", err, arguments);
}

var commonPages = ['site-nav', 'search-bar', 'site-footer', 'kslider', 'block-group', 'guess-you-like'];
requirejs(['app'], function () {
    requirejs(['routes', 'intercepter'].concat(commonPages), function () {
        angular.bootstrap(document, ['kapp']);
    });
});
