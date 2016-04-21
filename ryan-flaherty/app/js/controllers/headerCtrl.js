'use strict';

module.exports = function(app) {
  app.controller('headerCtrl', ['$location', 'Auth', function($location, Auth) {

    var vm = this;
    vm.isLoggedIn = false;

    vm.logMeOut = function() {
      Auth.signOut();
      $location.path('/login');
    };

    vm.checkBand = function() {
      if (Auth.getBandName()) vm.isLoggedIn == true;
    };

  }]);
};
