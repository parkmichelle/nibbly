'use strict';

cs142App.controller('SearchResultController', ['$scope', '$resource',
    function ($scope, $resource) {

	var Nibbles = $resource('/list/nibbles', {}, {
	    get: { method: 'GET', isArray: true }
	});
	
	Nibbles.get(function(nibbles) {
	    $scope.data = nibbles;
	});
    }]
);
