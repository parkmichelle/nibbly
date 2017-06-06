'use strict';

cs142App.controller('UploadController', ['$scope', '$routeParams', '$resource', '$location', '$cookieStore', '$mdToast', '$http',
  function ($scope, $routeParams, $resource, $location, $cookieStore, $mdToast, $http) {
    $scope.uploadNibble = {};
    $scope.errorMessage = "";

    var Nibble = $resource('/nibble/new');

    // handle file upload
    var selectedFile;   // Holds the last file selected by the user

    // Called on file selection - we simply save a reference to the file in selectedFile
    $scope.inputFileNameChanged = function (element) {
        selectedFile = element.files[0];
        console.log(selectedFile);
    };

    // Has the user selected a file?
    $scope.inputFileNameSelected = function () {
        return !!selectedFile;
    };

    // Upload the photo file selected by the user using a post request to the URL /photos/new
    $scope.createNibbleClick = function (username) {
    console.log("GOT A CLICK");
        // check all parameters filled
        if (!$scope.uploadNibble.title || !$scope.uploadNibble.description) {
            console.log($scope.uploadNibble);
            console.error("uploadNibble called without all parameters filled");
            $scope.errorMessage = "Oops! You're missing a required parameter."
            $scope.uploadErr = "No file selected!";
            return;
        }

        console.log('fileSubmitted: ' + selectedFile);
    };
      

      var domForm = new FormData();
      domForm.append('uploadedfile', selectedFile);
      domForm.append('title', $scope.uploadNibble.title);
      domForm.append('description', $scope.uploadNibble.description);

      // Using $http to POST the form
      $http.post('/nibble/new', domForm, {
	  transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
      }).success(function(newNibble){
          // The photo was successfully uploaded. - change location to go to that nibble or user's home page
          $location.path("/home");
      }).error(function(err){
          // Couldn't upload the data
          console.error('ERROR uploading file', err);
      });
}]);

