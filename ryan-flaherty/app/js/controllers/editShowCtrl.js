'use strict';

module.exports = function(app) {
  app.controller('editShowCtrl', ['$scope', '$location', '$http', 'Auth', function($scope, $location, $http, Auth) {

    var vm = this;
    vm.edit = false;
    vm.cancelShow = {};

    vm.getShow = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/shows/' + id).success(function(response) {
        vm.show = response;
        vm.show.date = new Date(vm.show.date);
        vm.updateShow = vm.show;
        vm.cancelShow = angular.copy(vm.show);
      });
    };

    vm.putShow = function(updateShow) {
      $http({
        method: 'PUT',
        url: '/shows/' + vm.show._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: updateShow
      })
      .success(function (data){
        console.log(data);
        vm.edit = false;
        vm.message = 'Show Updated';
      });
    };

    vm.delShow = function() {
      $http({
        method: 'DELETE',
        url: '/shows/' + vm.show._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        }
      })
      .success(function (data){
        console.log(data);
        $location.path('/');
      });
    };

    vm.cancel = function(){
      vm.edit = false;
      vm.show.cost = vm.cancelShow.cost;
      vm.show.date = vm.cancelShow.date;
      vm.show.bands = vm.cancelShow.bands;
      vm.show.regBands = vm.cancelShow.regBands;
      vm.show.venue = vm.cancelShow.venue;
    };

  }]);
};
