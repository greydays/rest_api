'use strict';

module.exports = function(app) {
  app.controller('AppCtrl', ['$scope', '$http', '$location', 'Auth', 'restService', function($scope, $http, $location, Auth, restService) {

    var mainRoute = 'http://localhost:3000';
    var showResource = restService('shows');

    var testShow = [{
      date: 'Mon Apr 30 2016 18:00:00 GMT-0700 (PDT)',
      venue: 'test palace',
      bands: 'The Tests',
      cost: 10,
      _id: 'testId'
    }];

    $scope.getShow = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get(mainRoute + '/shows/' + id)
      .success(function(response) {
        $scope.show = response;
      });
    };

    $scope.getAllShows = function() {
      $http.get(mainRoute + '/shows').success(function(response){
        if (response.length == 0) $scope.shows = testShow;
        else $scope.shows = response;
      });
    };

    $scope.submitSignIn = function(band) {
      Auth.signIn(band, function() {
        $location.path('/');
      });
    };

    $scope.signup = true;
    $scope.submitSignUp = function(band) {
      Auth.createBand(band, function() {
        $location.path('/login');
      });
    };

    $scope.postShow = function(newShow) {
      showResource.create(newShow)
      .success(function (data){
        console.log(data);
        $location.path('/');
      });
    };

  }]);
};
