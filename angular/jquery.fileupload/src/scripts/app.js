var app = angular.module('app', ['ngRoute','ngRequire']);

app.config(['$routeProvider','$requireProvider', function($routeProvider, $requireProvider) {
    $routeProvider
        .when('/upload', {
            'templateUrl':'views/upload/index.html',
            resolve: {
                deps: $requireProvider.requireJS(['views/upload/upload','css!views/upload/upload.css'])
            },
            controller: function($scope) {
                fileUpload.init();
            }
        })
}]);

define([], function() {
    return app;
});