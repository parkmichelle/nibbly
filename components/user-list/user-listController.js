'use strict';

cs142App.controller('UserListController', ['$scope', '$resource',
    function ($scope, $resource) {
        $scope.main.title = 'Users';

        var Users = $resource('/user/list', {}, {
          get: { method: 'GET', isArray: true }
        });
        var Counts = $resource('/counts');

        $scope.users = Users.get();
        $scope.counts = Counts.get();
    }]);
