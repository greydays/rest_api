'use strict';

module.exports = function(app) {

  app.directive('footerDir', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/html/footer.html'
    };
  });

};


