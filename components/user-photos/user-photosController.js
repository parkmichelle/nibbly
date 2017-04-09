'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
     $scope.userId = $routeParams.userId;

     var User = $resource('/user/:id', {id: '@id'});
     User.get({id: $scope.userId}, function(user) {
       $scope.main.title = "Photos of " + user.first_name + " " + user.last_name;
     });


    $scope.index = $routeParams.index;
    $scope.main.advFeat = ($scope.index) ? true : false;
    var Photos = $resource('/photosOfUser/:id', {id: '@id'}, {
      get: { method: 'GET', isArray: true }
    });
    Photos.get({id: $scope.userId}, function(photos) {
      $scope.photos = photos;
      if ($scope.index) {
        $scope.photoAtIndex = $scope.photos[$scope.index];
        $scope.prevIndex = $scope.index - 1;
        $scope.nextIndex = - 1;
        if ($scope.index < ($scope.photos.length - 1)) {
          $scope.nextIndex = parseInt($scope.index )+ 1;
        }
      }
    });
  }]);
