'use strict';

module.exports = function(app) {
  app.factory('Auth', ['$http', '$window', function($http, $window) {
    var token;
    var band;
    var auth = {
      createBand: function(band, cb) {
        cb = cb || function(){};
        $http.post('/bands', band)
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            cb(null);
          }, function(res) {
            console.log(res);
            cb(res.err);
          });
      },
      signIn: function(band, cb) {
        cb = cb || function(){};
        $http({
          method: 'POST',
          url: '/login',
          headers: {
            'Authorization': 'Basic ' + btoa((band.email + ':' + band.password))
          }
        })
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            cb(null);
          }, function(res) {
            console.log(res);
            cb(res);
          });
      },
      getToken: function() {
        token = token || $window.localStorage.token;
        return token;
      },
      signOut: function(cb) {
        $window.localStorage.token = null;
        token = null;
        band = null;
        if (cb) cb();
      }
    };
    return auth;
  }]);
};
