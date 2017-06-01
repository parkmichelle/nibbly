'use strict';

cs142App.controller('HomeController', ['$scope', '$routeParams', '$resource', '$location',
  function ($scope, $routeParams, $resource, $location) {

      $scope.main.location = 'home';

      var Nibbles = $resource('/list/featured', {}, {
	  get: { method: 'GET', isArray: true }
      });
      Nibbles.get(function(nibbles) {
          $scope.featuredNibbles = nibbles;
      });

      $scope.searchEnter = function() {
	  $location.path("/search/" + $scope.searchQuery);
      };

  }]);
