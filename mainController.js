'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial', 'ngResource']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController'
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/photos/:userId/:index', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/comments/:userId', {
                templateUrl: 'components/comment-list/comment-listTemplate.html',
                controller: 'CommentListController'
            }).
            when('/photo/:photoId', {
                templateUrl: 'components/photo-detail/photo-detailTemplate.html',
                controller: 'PhotoDetailController'
            }).
            otherwise({
                redirectTo: '/users'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$location', '$resource',
    function ($scope, $location, $resource) {
        $scope.main = {};
        $scope.main.title = 'Users';
        $scope.main.author = 'Shubhang Desai';

        $scope.main.advFeat = false;
        $scope.main.advToggle = function() {
          var url = $location.url();
          if (url.search("/photos") !== -1) {
            var re = new RegExp('\/[0-9]$');
            url = (url.search(re) !== -1) ? url.replace(re, '') : url + "/0";
            $location.url(url);
          }
        };

        var Info = $resource('/test/info');
        Info.get(function(info) {
          $scope.main.version = info.__v;
        });
    }]);
