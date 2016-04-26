'use strict';

module.exports = function(app) {

  app.directive('header', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/html/header.html',
      transclude: true
    };
  });
};

