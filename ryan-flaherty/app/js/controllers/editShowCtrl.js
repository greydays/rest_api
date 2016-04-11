'use strict';

module.exports = function(app) {
  app.controller('editShowCtrl', ['$scope', '$location', '$http', 'Auth', function($scope, $location, $http, Auth) {

    $scope.edit = false;

    $scope.getShow = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/shows/' + id).success(function(response) {
       $scope.show = response;
       $scope.show.date = new Date($scope.show.date);
      });
    };

    $scope.putShow = function(show) {
      $http({
        method: 'PUT',
        url: '/shows/' + $scope.show._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: $scope.show
      })
      .success(function (data){
        console.log(data);
        $scope.edit = false;
        $scope.message = 'Show Updated';
      });
    };

    $scope.delShow = function() {
      $http({
        method: 'DELETE',
        url: '/shows/' + $scope.show._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        }
      })
      .success(function (data){
        console.log(data);
        $location.path('/');
      });
    };

    $scope.shit = function() {
      console.log('Shit');
    };

  }]);
};
