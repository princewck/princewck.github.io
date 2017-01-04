require.config({
    baseUrl:'../src',
    waitSeconds:0,
    paths: {
        "angular":"//cdn.bootcss.com/angular.js/1.4.6/angular.min",
        'angular-route':"//cdn.bootcss.com/angular.js/1.4.6/angular-route.min",
        'angular-require': "public/angular-require/angular-require.min",
        'bootstrap':"//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min",
        "jquery":"//cdn.bootcss.com/jquery/2.1.4/jquery.min",
        'jquery.fileupload':'//cdn.bootcss.com/blueimp-file-upload/9.10.4/jquery.fileupload',
        'jquery.ui.widget':'//cdn.bootcss.com/blueimp-file-upload/9.10.4/vendor/jquery.ui.widget',
        'app':"scripts/app",
        'directive.fileupload':'directives/fileupload/uploader'
    },
    shim: {
        'bootstrap': {
            deps: ['css!//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css']
        },
        angular: {
            exports: "angular"
        },
        "angular-route":{
            deps: ["angular"]
            ,exports:"angular-route"
        }
    },
    map: {
        '*': {
            'css': '//apps.bdimg.com/libs/require-css/0.1.8/css.min.js' // or whatever the path to require-css is
        }
    }
});

requirejs(['jquery', 'angular'],function() {
    requirejs(['angular-route','angular-require','bootstrap'], function() {
        requirejs(['app'], function() {
            requirejs(['directive.fileupload'], function() {
                angular.bootstrap(document, ['app']);
            });
        })
    });
});