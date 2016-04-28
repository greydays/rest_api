'use strict';

require('angular/angular');
require('angular-route');

var app = angular.module('app', ['ngRoute']); // eslint-disable-line

require('./controllers/appController')(app);
require('./controllers/headerCtrl')(app);
require('./controllers/editShowCtrl')(app);
require('./controllers/bandCtrl')(app);

require('./directives/headerDir')(app);
require('./directives/footerDir')(app);

require('./services/auth')(app);
require('./services/restService')(app);
require('./services/errorHandler')(app);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/shows', {templateUrl: 'html/shows.html'})
    .when('/shows/:_id', {templateUrl: 'html/singleshow.html'})
    .when('/newband', {templateUrl: 'html/newband.html'})
    .when('/newshow', {templateUrl: 'html/newshow.html'})
    .when('/', {templateUrl: 'html/shows.html'})
    .when('/profile', {templateUrl: 'html/profile.html'})
    .when('/bands/:_id', {templateUrl: 'html/profile.html'})
    .otherwise({redirectTo: '/shows'});
}]);


