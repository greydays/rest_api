require('../public/bundle.js');
require('angular-mocks');

describe('it should test something', () => {
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
    // expect(appCtrl.people[0]).toBe('person');
    expect(typeof scope.getAllShows).toBe('function');
  });
  describe('REST tests', () => {
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
        .respond(200, {show: [{date: newDate, venue: 'testHouse', bands: 'Murder Trout, The Hookup Drones, Cameltoesocks', cost: 10, _id: 'uniqueid'}]});
      scope.getAllShows();
      $httpBackend.flush();
      expect(scope.show.length).toBeGreaterThan(0);
      expect(scope.show[0].venue).toBe('testHouse');
    });

/*    it('should POST a show', () => {
      var newDate = new Date();
      $httpBackend.expectPOST('http://localhost:3000/shows')
        .respond(200, {show: [{date: newDate, venue: 'testHouse', bands: 'Murder Trout, The Hookup Drones, Cameltoesocks', cost: 10, _id: 'uniqueid'}]});
      scope.postShow({date: newDate, venue: 'testHouse', bands: 'Murder Trout, The Hookup Drones, Cameltoesocks', cost: 10});
      $httpBackend.flush();
      expect(scope.show.length).toBeGreaterThan(0);
      expect(scope.show[0].venue).toBe('testHouse');
    });*/

    /*it('should create a new person', () => {
      $httpBackend.expectPOST('http://localhost:3000/people', {name: 'test person'})
        .respond(200, {name: 'test person', age: 18, _id:'uniqueid'});
      peopleController.createPerson({name: 'test person'})
      $httpBackend.flush();
      expect(peopleController.people.length).toBe(2);
      expect(peopleController.people[1].name).toBe('test person');
      expect(peopleController.newPerson).toBeNull();
    });

    it('should delete a person', () => {
      $httpBackend.expectDELETE('http://localhost:3000/people/5')
        .respond(200, 'deleted');
      peopleController.people.push({name: 'test person', _id: 5});
      peopleController.removePerson({name: 'test person', _id: 5});
      $httpBackend.flush();
      expect(peopleController.people.length).toBe(1);
      expect(peopleController.people.every((p) => p._id != 5)).toBe(true);
    });

    it('should update a person', () => {
      var updatePerson = {name: 'test person', _id: 5};
      $httpBackend.expectPUT('http://localhost:3000/people/5')
        .respond(200, 'updated');
      peopleController.people.push(updatePerson);
      peopleController.updatePerson(updatePerson);
      $httpBackend.flush();
      expect(updatePerson.editing).toBe(false);
    });*/
  });
});
