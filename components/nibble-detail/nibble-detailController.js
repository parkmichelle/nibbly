'use strict';

cs142App.controller('NibbleDetailController', ['$scope', '$routeParams', '$resource',
  function ($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
      var currNibbleId = $routeParams.id;

      var Nibble = $resource('/nibble/:id', {id: '@id'});

      console.log(Nibble);

      Nibble.get({id: currNibbleId}, function(nibble) {
	  $scope.currNibble = nibble;
	  console.log(nibble.Contents);
	  var file = nibble.Contents.file;
	  if (file != null) {
	      $scope.downloadUrl = (window.URL || window.webkitURL).createObjectURL(nibble.Contents.file);
	      console.log($scope.downloadURL);
	  }
      });

      // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("nibble-detail-download-button");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {

	var myBlob = new Blob([$scope.currNibble.Contents[0].file.data], {type : ""});
	var hiddenElement = document.createElement('a');
//	var mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation/';
//	var mimeType = 'data:text/plain,';
	var mimeType = '';
	console.log($scope.currNibble);
//	hiddenElement.href = mimeType + encodeURI($scope.currNibble.Contents[0].file);
	hiddenElement.href = mimeType + encodeURI(myBlob);
	console.log("HREF: " + hiddenElement.href);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'myFile.txt';
	hiddenElement.click();

//        modal.style.display = "block";
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
