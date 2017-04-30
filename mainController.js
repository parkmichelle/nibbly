'use strict';

// attempt to set up sequel-ize???!!!
var models = require("./models"); //place on top of the file
models.sequelize.sync().then(function() {
 var server = app.listen(app.get('port'), function() {
 console.log('Express server listening on port ' + server.address().port);
 });
});

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial', 'ngResource']);

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
            otherwise({
                redirectTo: '/home'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$location', '$resource',
    function ($scope, $location, $resource) {
        $scope.main = {};
        $scope.main.title = 'Nibbly';
    }]);
