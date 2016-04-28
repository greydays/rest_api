'use strict';

module.exports = function(app) {
  app.controller('AppCtrl', ['$scope', '$http', '$location', 'Auth', 'restService', 'ErrorService', function($scope, $http, $location, Auth, restService, ErrorService) {

    var mainRoute = 'http://localhost:3000';
    var showResource = restService('shows');
    $scope.error = ErrorService();

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
        .then(function(response) {
          $scope.show = response.data;
          $scope.error = ErrorService(null);
        }, (err) => {
          $scope.error = ErrorService('Could not get show');
        });
    };

    $scope.getAllShows = function() {
      $http.get(mainRoute + '/shows')
        .then(function(response){
          if (response.length == 0) $scope.shows = testShow;
          else $scope.shows = response.data;
        }, (err) => {
          $scope.error = ErrorService('Could not get shows');
        });
    };

    $scope.submitSignUp = function(band) {
      Auth.createBand(band, function() {
        $location.path('/newshow');
      });
    };

    $scope.postShow = function(newShow) {
      showResource.create(newShow)
        .then(function (data){
          console.log(data);
          $location.path('/');
        }, (err) => {
          $scope.error = ErrorService('Could not create show');
        });
    };

  }]);
};
