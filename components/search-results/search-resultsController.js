'use strict';

cs142App.controller('CommentListController', ['$scope', '$routeParams', '$resource',
    function ($scope, $routeParams, $resource) {
      var userId = $routeParams.userId;
        $scope.main.title = 'Comments';

        var Comments = $resource('/comments/:id', {id: '@id'}, {
          get: {method: 'get', isArray: true}
        });

        $scope.comments = [];
        Comments.get({id: userId}, function(comments) {
          $scope.comments = comments;
        });
    }
  ]);
