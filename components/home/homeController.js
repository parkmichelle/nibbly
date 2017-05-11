'use strict';

cs142App.controller('HomeController', ['$scope', '$routeParams', '$resource',
  function ($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;
  //  var User = $resource('/user/:id', {id: '@id'});
    $scope.main.location = 'home';
/*
    User.get({id: userId}, function(user) {
      $scope.user = user;
      $scope.main.title = user.first_name + ' ' + user.last_name;
    });
*/

    // featured content
    // TODO: update to grab featured content
        //sort nibbles by popularity
        //choose top 5
    var Nibbles = $resource('/list/featured', {}, {
      get: { method: 'GET', isArray: true }
    });
    Nibbles.get(function(nibbles) {
        $scope.featuredNibbles = nibbles;
    });

  }]);
