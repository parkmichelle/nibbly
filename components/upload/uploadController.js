'use strict';

cs142App.controller('UploadController', ['$scope', '$routeParams', '$resource', '$location', '$cookieStore', '$mdToast', '$http',
  function ($scope, $routeParams, $resource, $location, $cookieStore, $mdToast, $http) {
    $scope.uploadNibble = {};
    $scope.errorMessage = "";

      $scope.durationSlider = {
	  value: 45,
	  options: {
	      floor: 5,
	      ceil: 300,
	      step: 5,
	      translate: function(value) {
		  if (value%60 == 0) {
		      return value/60 + "hr ";
		  } else {
		      return Math.floor(value/60) + "hr " + value%60 + "min";
		  }
	      }
	  }
      };

      $scope.difficultySlider = {
	  value: 1,
	  options: {
	      showTicksValues: true,
	      stepsArray: [
		  {value: 1, legend: 'Beginner'},
		  {value: 2},
		  {value: 3, legend: 'Intermediate'},
		  {value: 4},
		  {value: 5, legend: 'Advanced'},
	      ]
	  }
      };
      console.log($scope.slider1);
      var Nibble = $resource('/nibble/new');

      // handle file upload
      var selectedFile;   // Holds the last file selected by the user

      // Called on file selection - we simply save a reference to the file in selectedFile
      $scope.inputFileNameChanged = function (element) {
          selectedFile = element.files[0];
          console.log("selectedFile: ", selectedFile);
      };

      // Has the user selected a file?
      $scope.inputFileNameSelected = function () {
          return !!selectedFile;
      };

      // Upload the photo file selected by the user using a post request to the URL /photos/new
      $scope.createNibbleClick = function (username) {

          // check all parameters filled
          if (!$scope.uploadNibble.title || !$scope.uploadNibble.description) {
              console.error("uploadNibble called without all parameters filled");
              $scope.errorMessage = "Oops! You're missing a required parameter."
              $scope.uploadErr = "No file selected!";
              return;
          }

          // Create a DOM form and add the file
          var domForm = new FormData();
          domForm.append('uploadedfile', selectedFile);
          domForm.append('title', $scope.uploadNibble.title);
          domForm.append('description', $scope.uploadNibble.description);
          domForm.append('duration', $scope.durationSlider.value);
          domForm.append('difficulty', $scope.difficultySlider.value);

          // Using $http to POST the form
          $http.post('/nibble/new', domForm, {
	      transformRequest: angular.identity,
	      headers: {'Content-Type': undefined}
          }).success(function(id){
	      // Upload complete, so change location to go to nibble
	      $location.path("/nibble-detail/" + id);
          }).error(function(err){
	      // Couldn't upload the photo. XXX  - Do whatever you want on failure.
	      console.error('ERROR uploading file', err);
          });
      };

  }]);
