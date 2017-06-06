'use strict';

cs142App.controller('SearchResultController', ['$scope', '$resource', '$routeParams', '$location',
    function ($scope, $resource, $routeParams, $location) {

	$scope.searchQuery = $routeParams.query;

	var Nibbles = $resource('/list/nibbles/'+$routeParams.query, {}, {
	    get: { method: 'GET', isArray: true }
	});
	
	Nibbles.get(function(nibbles) {
	    console.log(nibbles);
	    $scope.data = nibbles;
	});

	$scope.searchEnter = function() {
	    $location.path("/search/" + $scope.searchQuery);
	};

    }]
);
