'use strict';

module.exports = function(app) {
  app.controller('BandCtrl', ['$http', '$location', 'Auth', 'restService', function($http, $location, Auth, restService) {

    var vm = this;
    vm.editAble = false;
    vm.edit = false;
    vm.cancelEdit = {};
    var mainRoute = 'http://localhost:3000';
    var bandResource = restService('bands');
    vm.bandName = Auth.getBandName() || null;

//if logged profile vs bandid
    vm.getBand = function() {
      $http({
        method: 'POST',
        url: mainRoute + '/profile',
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: {bandName: vm.bandName}
      })
      .then(function(response) {
        vm.band = response.data;
        vm.updateBand = vm.band;
        vm.cancelEdit = angular.copy(vm.band);
      });
    };

    vm.checkBand = function() {
      if (vm.bandName === vm.band.name) vm.editAble = true;
    };

    vm.putBand = function(updateBand) {
      bandResource.update(updateBand)
      .then(function (response){
        console.log(response.data);
        vm.edit = false;
        vm.message = 'Band Updated';
      });
    };

    vm.delBand = function() {
      bandResource.remove(vm.band)
        .then(function (response){
          console.log(response.data);
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
