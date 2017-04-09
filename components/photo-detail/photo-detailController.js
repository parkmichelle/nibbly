'use strict';

cs142App.controller('PhotoDetailController', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var photoId = $routeParams.photoId;
    $scope.main.title = 'Photo Detail';
    $scope.main.advFeat = true;

    var PhotoWithID = $resource('/photoWithID/:id', {id: '@id'}, {
      get: {method: 'get', isArray: true}
    });
    PhotoWithID.get({id: photoId}, function(photo) {
      $scope.photo = photo[0];
    });
  }]);
