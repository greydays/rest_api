'use strict';

module.exports = function(app) {

  app.directive('header', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/html/header.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      },
      transclude: true
    };
  });
};

