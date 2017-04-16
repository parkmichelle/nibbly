'use strict';

cs142App.controller('SearchResultController', ['$scope',
    function ($scope) {
      $scope.data = [
        {
          title: "Intro to Giphy API",
          numDownloads: 2595,
          rating: 4,
          author: "Rachel Gardner",
          description: "Introduces the concept of APIs and teaches how to use Giphy API"
        },
        {
          title: "Google Maps API",
          numDownloads: 5794,
          rating: 3,
          author: "Dude Dylan",
          description: "Teaches how to use the Google Maps API and includes a video demo. Workshop taught at Google WiCS conference."
        },
        {
          title: "How to Use the Twitter API",
          numDownloads: 3895,
          rating: 4,
          author: "Bob Dylan",
          description: "Teaches the basics of the Twitter API with code samples."
        }
      ]
    }
  ]);
