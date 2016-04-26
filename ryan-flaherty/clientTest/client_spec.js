// require('../public/bundle.js');
require('../app/js/client.js');
require('angular-mocks');

describe('client:', () => {
  var appCtrl;
  var scope;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('app'))
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    appCtrl = $controller('AppCtrl', {
      $scope: scope
    });
  }));
  it('should construct a controller', () => {
    expect(typeof appCtrl).toBe('object');
    expect(typeof scope.getAllShows).toBe('function');
  });
  describe('REST', () => {
    var $httpBackend;
    var $window;
    beforeEach(angular.mock.inject(function(_$httpBackend_, _$window_) {
      $httpBackend = _$httpBackend_;
      $window = _$window_;
      $window.localStorage = {
        token: 'testAuthToken'
      };
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })

    it('should get all shows', () => {
      var newDate = new Date();
      $httpBackend.expectGET('/shows')
        .respond(200, [{date: newDate, venue: 'testHouse', bands: 'Murder Trout, The Hookup Drones, Cameltoesocks', cost: 10, _id: 'uniqueid'}]);
      scope.getAllShows();
      $httpBackend.flush();
      expect(scope.shows.length).toBeGreaterThan(0);
      expect(scope.shows[0].venue).toBe('testHouse');
    });

/*    it('should POST a show', () => {
      var newDate = new Date();
      $httpBackend.expectPOST('/shows', {headers: })
        .respond(200, {date: newDate, venue: 'testHouse', bands: 'Murder Trout, The Hookup Drones, Cameltoesocks', cost: 10, _id: 'uniqueid'});
      scope.postShow({date: newDate, venue: 'testHouse2', bands: 'Murder Trout, The Hookup Drones, Cameltoesocks', cost: 10});
      $httpBackend.flush();
      expect(scope.shows.length).toBeGreaterThan(1);
      expect(scope.shows[1].venue).toBe('testHouse2');
    });*/



  });
});
