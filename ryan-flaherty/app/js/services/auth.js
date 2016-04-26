'use strict';

module.exports = function(app) {
  app.factory('Auth', ['$http', '$window', function($http, $window) {
    var mainRoute = 'http://localhost:3000';
    var token;
    var bandName;
    var auth = {
      createBand: function(band, cb) {
        cb = cb || function(){};
        $http.post(mainRoute + '/bands', band)
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            bandName = $window.localStorage.bandName = res.data.name;
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
          url: mainRoute + '/login',
          headers: {
            'Authorization': 'Basic ' + btoa((band.email + ':' + band.password))
          }
        })
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            bandName = $window.localStorage.bandName = res.data.name;
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
      getBandName: function() {
        bandName = bandName || $window.localStorage.bandName;
        return bandName;
      },
      signOut: function(cb) {
        $window.localStorage.token = null;
        $window.localStorage.bandName = null;
        token = null;
        bandName = null;
        if (cb) cb();
      }
    };
    return auth;
  }]);
};
