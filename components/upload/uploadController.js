'use strict';

cs142App.controller('UploadController', ['$scope', '$routeParams', '$resource', '$location', '$cookieStore', '$mdToast',
  function ($scope, $routeParams, $resource, $location, $cookieStore, $mdToast) {
    $scope.uploadNibble = {};
    $scope.uploadNibble.title = "";
    $scope.uploadNibble.subject = "";
    $scope.uploadNibble.duration;
    $scope.uploadNibble.difficulty = "";
    $scope.uploadNibble.files = [];

    $scope.errorMessage = "";

    var Nibbles = $resource('/nibble', {}, {
        put: { method: 'POST' }
    });
    
    Nibbles.put(function(nibbles) {
        console.log(nibbles);
        $scope.data = nibbles;
    });

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
        // check all parameters filled
        if (!($scope.inputFileNameSelected() && $scope.uploadNibble.title && $scope.uploadNibble.subject 
          && $scope.uploadNibble.duration)) {
            console.error("uploadNibble called without all parameters filled");
            $scope.errorMessage = "Oops! You're missing a required parameter."
            $scope.uploadErr = "No file selected!";
            return;
        }

        console.log('fileSubmitted', selectedFile);

        // Create a DOM form and add the file
        var domForm = new FormData();
        domForm.append('uploadedphoto', selectedFile);
        // TODO: append rest of nibble stuff here

        // Using $http to POST the form
        $http.post('/nibble/new', domForm, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function(newPhoto){
            // The photo was successfully uploaded. - change location to go to that nibble or user's home page
            $location.path("/home");
        }).error(function(err){
            // Couldn't upload the photo. XXX  - Do whatever you want on failure.
            console.error('ERROR uploading file', err);
        });
    };
  }]);
