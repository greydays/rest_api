'use strict';

module.exports = function(app) {
  app.controller('editShowCtrl', ['$scope', '$location', '$http', 'Auth', function($scope, $location, $http, Auth) {

    $scope.edit = false;
    $scope.updateShow = {};
    $scope.cancelShow = {};

    $scope.getShow = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/shows/' + id).success(function(response) {
        $scope.show = response;
        $scope.show.date = new Date($scope.show.date);
        $scope.updateShow = $scope.show;
        $scope.cancelShow = angular.copy($scope.show);
      });
    };

    $scope.putShow = function(updateShow) {
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

    $scope.cancel = function(){
      $scope.edit = false;
      $scope.show.cost = $scope.cancelShow.cost;
      $scope.show.date = $scope.cancelShow.date;
      $scope.show.bands = $scope.cancelShow.bands;
      $scope.show.regBands = $scope.cancelShow.regBands;
      $scope.show.venue = $scope.cancelShow.venue;
    };

  }]);
};
