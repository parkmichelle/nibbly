'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial', 'ngResource', 'ngCookies']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'components/home/homeTemplate.html',
                controller: 'HomeController'
            }).
            when('/nibble-detail/:id', {
                templateUrl: 'components/nibble-detail/nibble-detailTemplate.html',
                controller: 'NibbleDetailController'
            }).
            when('/search', {
                templateUrl: 'components/search-result/search-resultTemplate.html',
                controller: 'SearchResultController'
            }).
            when('/login', {
                templateUrl: 'components/login/loginTemplate.html',
                controller: 'LoginController'
            }).
            when('/upload', {
                templateUrl: 'components/upload/uploadTemplate.html',
                controller: 'UploadController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$location', '$resource', '$cookieStore',
    function ($scope, $location, $resource, $cookieStore) {
        $scope.main = {};
        $scope.main.title = 'Nibbly';
        $scope.main.loginUser = $cookieStore.get("loginUser");

        $scope.logout = function() {
          $scope.main.loginUser = undefined;
          $location.path("/home");
          $cookieStore.remove("loginUser");
        }
    }]);
