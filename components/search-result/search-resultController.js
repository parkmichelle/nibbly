'use strict';

cs142App.controller('SearchResultController', ['$scope', '$resource', '$routeParams',
    function ($scope, $resource, $routeParams) {

    $scope.searchQuery = $routeParams.query;

	var Nibbles = $resource('/list/nibbles', {}, {
	    get: { method: 'GET', isArray: true }
	});
	
	Nibbles.get(function(nibbles) {
	    console.log(nibbles);
	    $scope.data = nibbles;
	});
    }]
);
