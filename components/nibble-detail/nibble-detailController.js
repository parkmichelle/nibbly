'use strict';

cs142App.controller('NibbleDetailController', ['$scope', '$routeParams', '$resource', '$sce',
  function ($scope, $routeParams, $resource, $sce) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
      var currNibbleId = $routeParams.id;

      var Nibble = $resource('/nibble/:id', {id: '@id'});

      Nibble.get({id: currNibbleId}, function(nibble) {
	  $scope.currNibble = nibble;
	  $scope.contentLink = "https://docs.google.com/presentation/d/";
	  $scope.contentLink += nibble.Contents[0].fileId;
	  $scope.contentLink += "/embed?start=false&loop=false&delayms=3000";
	  // used to waive normal XSS scripting protections
	  $scope.contentLink = $sce.trustAsResourceUrl($scope.contentLink); 
	  $scope.downloadLink = $sce.trustAsResourceUrl(nibble.Contents[1].downloadLink);
	  console.log("downloadLink", nibble.Contents[1].downloadLink);
	  console.log("currNibble: ", nibble);
      });

      // Get the modal
      var modal = document.getElementById('myModal');

      // Get the button that opens the modal
      var btn = document.getElementById("nibble-detail-download-button");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on the button, open the modal
      btn.onclick = function() {
          modal.style.display = "block";
      }

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }

  }]);
