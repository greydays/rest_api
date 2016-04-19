'use strict';

require('angular/angular');
require('angular-route');

var app = angular.module('app', ['ngRoute']); // eslint-disable-line

require('./controllers/appController')(app);
require('./controllers/headerCtrl')(app);
require('./controllers/editShowCtrl')(app);

require('./directives/appDirectives')(app);

require('./services/auth')(app);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/shows', {templateUrl: 'html/shows.html'})
    .when('/shows/:_id', {templateUrl: 'html/singleshow.html'})
    .when('/newband', {templateUrl: 'html/newband.html'})
    .when('/login', {templateUrl: 'html/login.html'})
    .when('/newshow', {templateUrl: 'html/newshow.html'})
    .when('/', {templateUrl: 'html/shows.html'})
    .otherwise({redirectTo: '/shows'});
}]);

