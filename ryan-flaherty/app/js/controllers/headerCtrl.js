'use strict';

module.exports = function(app) {
  app.controller('headerCtrl', ['$location', 'Auth', function($location, Auth) {

    this.logMeOut = function() {
      Auth.signOut();
      $location.path('/login');
      console.log('signed out');
    };

  }]);
};
