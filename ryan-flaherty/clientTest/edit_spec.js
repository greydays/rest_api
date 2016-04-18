require('../public/bundle.js');
require('angular-mocks');

describe('it should test something', () => {
  var editShowController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('app'))
  beforeEach(angular.mock.inject(function( $controller) {
    editShowController = $controller('editShowCtrl', {$location: {
      path: function() {
        return '/uniqueId'
      }
    }})
  }));
  it('should construct a controller', () => {
    expect(typeof editShowController).toBe('object');
    expect(typeof editShowController.getShow).toBe('function');
  });
  describe('edit Rest tests', () => {
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
    });

    it('should get a show', () => {
      var newDate = new Date();
      $httpBackend.expectGET('shows/uniqueId')
        .respond(200, {show: {date: newDate, venue: 'testHouse', bands: 'Murder Trout, The Hookup Drones, Cameltoesocks', cost: 10, _id: 'uniqueId'}});
      editShowController.getShow();
      $httpBackend.flush();
      expect(editShowController.show.venue).toBe('testHouse');
    });


  });
});
