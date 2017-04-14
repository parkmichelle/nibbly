'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial', 'ngResource']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'components/home/homeTemplate.html',
                controller: 'HomeController.js'
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
            when('/search', {
                templateUrl: 'components/search-result/search-resultTemplate.html',
                controller: 'SearchResultController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$location', '$resource',
    function ($scope, $location, $resource) {
        $scope.main = {};
        $scope.main.title = 'Nibbly';
    }]);
