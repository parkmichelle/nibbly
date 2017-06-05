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
        

    /// encode file as base64
    // var reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    // reader.onload = function() {
    //     var dataURL = reader.result;
    //     var string = dataURL.split(',')[1];

 //        // Create a DOM form and add the file
 //        var domForm = new FormData();
 //        domForm.append('uploadedfile', selectedFile);
 //        domForm.append('title', $scope.uploadNibble.title);
    //     domForm.append('encodedFile', string);
 //        domForm.append('description', $scope.uploadNibble.description);

        


        // Using $http to POST the form
        // $http.post('/nibble/new', domForm, {
        //     transformRequest: angular.identity,
        //     headers: {'Content-Type': undefined}
        // }).success(function(newNibble){
        //     // The photo was successfully uploaded. - change location to go to that nibble or user's home page
        //     $location.path("/home");
        // }).error(function(err){
        //     // Couldn't upload the photo. XXX  - Do whatever you want on failure.
        //     console.error('ERROR uploading file', err);
        // });
        
    var fs = require('fs');
    var readline = require('readline');
    var google = require('googleapis');
    var googleAuth = require('google-auth-library');

    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/drive-nodejs-quickstart.json
    var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
    var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
        process.env.USERPROFILE) + '/.credentials/';
    var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-uploadController.json';

    // Load client secrets from local file in api_keys folder under parent directory of nibbly
    fs.readFile('../../../api_keys/client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the
      // Drive API.
      authorize(JSON.parse(content), uploadFile);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          getNewToken(oauth2Client, callback);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          callback(oauth2Client);
        }
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    function getNewToken(oauth2Client, callback) {
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      console.log('Authorize this app by visiting this url: ', authUrl);
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
          if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
          }
          oauth2Client.credentials = token;
          storeToken(token);
          callback(oauth2Client);
        });
      });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
     */
    function storeToken(token) {
      try {
        fs.mkdirSync(TOKEN_DIR);
      } catch (err) {
        if (err.code != 'EEXIST') {
          throw err;
        }
      }
      fs.writeFile(TOKEN_PATH, JSON.stringify(token));
      console.log('Token stored to ' + TOKEN_PATH);
    }

    // uploads selectedFile to Google drive
    function uploadFile(auth) {
        var service = google.drive('v3');
        var fileMetadata = {
          'name': 'test',
          'mimeType': 'application/vnd.google-apps.presentation'
        };
        var media = {
          mimeType: 'application/vnd.ms-powerpoint',
          body: fs.createReadStream(selectedFile)
        };
        service.files.create({
           resource: fileMetadata,
           media: media,
           fields: 'id'
        }, function(err, file) {
          if(err) {
            // Handle error
            console.log(err);
          } else {
            console.log('File Id: ', file.id);
          }
        });
    }


}]);
