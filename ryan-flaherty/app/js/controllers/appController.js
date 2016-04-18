'use strict';

module.exports = function(app) {
  app.controller('AppCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {

    var host = 'http://localhost:3000';

    $scope.getShow = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/shows/' + id).success(function(response) {
        $scope.show = response;
      });
    };

    $scope.getAllShows = function() {
      $http.get('/shows').success(function(response){
        $scope.shows = response;
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
      $http({
        method: 'POST',
        url: '/shows',
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: newShow
      })
      .success(function (data){
        console.log(data);
        $location.path('/');
      });
    };

  }]);
};
