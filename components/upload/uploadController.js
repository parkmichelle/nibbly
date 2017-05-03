'use strict';

cs142App.controller('UploadController', ['$scope', '$routeParams', '$resource', '$location', '$cookieStore', '$mdToast',
  function ($scope, $routeParams, $resource, $location, $cookieStore, $mdToast) {
    $scope.uploadNibble = {};
    $scope.uploadNibble.title = "";
    $scope.uploadNibble.subject = "";
    $scope.uploadNibble.duration;
    $scope.uploadNibble.difficulty = "";
    $scope.uploadNibble.files = [];

    $scope.errorMessage = "";

    $scope.createNibble = function(username) {
      if (!($scope.title && $scope.subject && $scope.duration && ($scope.files !== []))) {
        // TODO: show error message
        $scope.errorMessage = "Oops! You're missing a required parameter."
      } else {
        // all parameters are filled, create nibble and push

      }
    };

    var Nibbles = $resource('/nibble', {}, {
        put: { method: 'POST', isArray: false }
    });
    
    Nibbles.put(function(nibbles) {
        console.log(nibbles);
        $scope.data = nibbles;
    });

  }]);
