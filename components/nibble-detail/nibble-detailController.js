'use strict';

cs142App.controller('NibbleDetailController', ['$scope', '$routeParams', '$resource',
  function ($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
      var currNibbleId = $routeParams.id;

      var Nibble = $resource('/nibble/:id', {id: '@id'});

      Nibble.get({id: currNibbleId}, function(nibble) {
	  $scope.currNibble = nibble;
      });

      // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("nibble-detail-download-button");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
	var byteArray = new Uint8Array($scope.currNibble.Contents[0].file.data);
	var myBlob = new Blob([byteArray], { type: 'application/octet-stream' });

	var hiddenElement = document.createElement('a');
	hiddenElement.href = window.URL.createObjectURL(myBlob);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'myFile.txt';
	hiddenElement.click();
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
