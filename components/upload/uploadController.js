'use strict';

cs142App.controller('UploadController', ['$scope', '$routeParams', '$resource', '$location', '$cookieStore', '$mdToast',
  function ($scope, $routeParams, $resource, $location, $cookieStore, $mdToast) {
    $scope.main.location = 'login';

    $scope.login = function(username, password) {
      var user = {username: username, password: password, _id: 1234};
      if (username === "took") {
        $scope.main.loginUser = user;
        $location.path("/home");
        $cookieStore.put("loginUser", user);
      } else {
        var errStr = "Login name does not exist.";
        $mdToast.show(
          $mdToast.simple()
            .textContent(errStr)
            .position('bottom right' )
            .hideDelay(3000)
        );
      }
    };
  }]);