'use strict';

module.exports = function(app) {
  app.controller('BandCtrl', ['$http', '$location', 'Auth', 'restService', function($http, $location, Auth, restService) {

    var vm = this;
    vm.editAble = false;
    vm.edit = false;
    vm.cancelEdit = {};
    var mainRoute = 'http://localhost:3000';
    var bandResource = restService('bands');

    vm.getBand = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/bands/' + id)
      .success(function(response) {
        vm.band = response;
        vm.updateBand = vm.band;
        vm.cancelEdit = angular.copy(vm.band);
      });
    };

    vm.checkBand = function() {
      if (Auth.getBandName() === vm.band.name) vm.editAble = true;
    };

    vm.putBand = function(updateBand) {
      bandResource.update(updateBand)
      .success(function (data){
        console.log(data);
        vm.edit = false;
        vm.message = 'Band Updated';
      });
    };

    vm.delBand = function() {
      bandResource.remove(vm.band)
      .success(function (data){
        console.log(data);
        $location.path('/');
      });
    };

    vm.cancel = function(){
      vm.edit = false;
      vm.band.name = vm.cancelEdit.name;
      vm.band.email = vm.cancelEdit.email;
      vm.band.password = vm.cancelEdit.password;
      vm.band.genre = vm.cancelEdit.genre;
    };

  }]);
};
