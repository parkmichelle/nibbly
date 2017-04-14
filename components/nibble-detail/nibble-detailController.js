'use strict';

cs142App.controller('NibbleDetailController', ['$scope', '$routeParams', '$resource',
  function ($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var currNibbleId = 0;//$routeParams.nibbleId;

    // TODO: grab nibble stuff from database
    $scope.currNibble = {};
    $scope.currNibble.name = "Test Nibble #1";
    $scope.currNibble.author = "Bob Bobby";
    $scope.currNibble.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique suscipit mauris at interdum. Pellentesque dictum consequat ex, semper lacinia ex vestibulum non. Vivamus porttitor, tortor eu hendrerit eleifend, felis arcu fringilla metus, eget rutrum sem diam id velit. Duis et arcu lacus. Integer id elit vel tortor suscipit pharetra. Phasellus eget efficitur arcu, eu auctor ante.";
    $scope.currNibble.slideImgSources = [];
    $scope.currNibble.videoImgSources = [];

  }]);
