//'use strict';

angular.module('fastFM', []).controller('MusicController', function($scope, $http) {

  $scope.currentPage = 1;
    $scope.selectedCountry = null;
    $scope.Countries = [];

    $http({
        method: 'GET',
        url: 'https://restcountries.eu/rest/v2/all'
    }).then(
        function(result) {
            $scope.Countries = result;
        }
    );

    var fromVal = 0;
    var toVal = 4;
  
    $scope.$watch('allCountries.selectedCountry', function() {
      ($scope.allCountries!=undefined) && fetch($scope.allCountries.selectedCountry);
    }, true);

// API KEY
    var API_KEY = "b02d934905ec31651b0435727e81aa88";
    var AudioScURL = "http://ws.audioscrobbler.com/2.0/?method=";
    var GetArtists = "geo.gettopartists";
    var GetTopTracks = "artist.gettoptracks";
    var limit = 5;

    function fetch(country) {

      $http.get(AudioScURL + GetArtists + "&country=" + country + "&api_key=" + API_KEY + "&format=json&limit=" + limit)
        .then(function(response) {
          $scope.details = response.data;
          $scope.details.country = $scope.details.topartists["@attr"]["country"];
          $scope.details.total = $scope.details.topartists["@attr"]["total"];
          $scope.details.response = !!($scope.details.topartists["@attr"]);
          $scope.fromVal = fromVal;
          $scope.limit = $scope.details.topartists.artist.length;
          showTheFive($scope.fromVal, $scope.limit);
        });

    }

    goPrev = function() {
      $scope.fromVal -= 5;
      $scope.fromVal = ($scope.fromVal < 0)?
        0:
        $scope.fromVal;
          showTheFive($scope.fromVal, $scope.limit);
    }
    goNext = function() {
      $scope.fromVal += 5;
      $scope.fromVal = ($scope.fromVal > $scope.limit)?
        $scope.limit-4:
        $scope.fromVal;
          showTheFive($scope.fromVal, $scope.limit);
    }

        showTheFive = function(fromVal, limit) {
          // alert(fromVal);
          // alert(limit);
          $scope.details.NumberOne = (fromVal <=  limit) ? (($scope.details.topartists.artist[fromVal].name) || ""):"";
          $scope.details.NumberTwo = (fromVal + 1 <= limit) ? (($scope.details.topartists.artist[fromVal + 1].name) || ""):"";
          $scope.details.NumberThree = (fromVal + 2 <= limit) ? (($scope.details.topartists.artist[fromVal + 2].name) || ""):"";
          $scope.details.NumberFour = (fromVal + 3 <= limit) ? (($scope.details.topartists.artist[fromVal + 3].name) || ""):"";
          $scope.details.NumberFive = (fromVal + 4 <= limit) ? (($scope.details.topartists.artist[fromVal + 4].name) || ""):"";

          $scope.details.NumberOneImg = (fromVal <=  limit) ? (($scope.details.topartists.artist[fromVal].image[1]["#text"]) || ""):"";
          $scope.details.NumberTwoImg = (fromVal + 1 <= limit) ? (($scope.details.topartists.artist[fromVal + 1].image[1]["#text"]) || ""):"";
          $scope.details.NumberThreeImg = (fromVal + 2 <= limit) ? (($scope.details.topartists.artist[fromVal + 2].image[1]["#text"]) || ""):"";
          $scope.details.NumberFourImg = (fromVal + 3 <= limit) ? (($scope.details.topartists.artist[fromVal + 3].image[1]["#text"]) || ""):"";
          $scope.details.NumberFiveImg = (fromVal + 4 <= limit) ? (($scope.details.topartists.artist[fromVal + 4].image[1]["#text"]) || ""):"";
          }

});


