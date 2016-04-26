'use strict';

module.exports = function(app) {
  app.controller('headerCtrl', ['$location', 'Auth', '$window', function($location, Auth, $window) {

    var vm = this;
    vm.isLoggedIn = false;

    vm.logMeOut = function() {
      Auth.signOut();
      vm.checkBand();
    };

    vm.checkBand = function() {
      if ($window.localStorage.bandName == undefined) {
        vm.isLoggedIn = false;
      } else if ($window.localStorage.bandName != 'null') {
        vm.isLoggedIn = true;
      } else {
        vm.isLoggedIn = false;
      }
    };

    vm.submitSignIn = function(band) {
      Auth.signIn(band, function() {
        $location.path('/');
        vm.checkBand();
      });
    };

  }]);
};
