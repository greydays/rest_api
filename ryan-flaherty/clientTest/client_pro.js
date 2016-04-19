/* in separate terminal tabs:
  ~$ pyserve (from public folder)
  ~$ webdriver-manager start
  ~$ protractor protractor-conf.js
*/

describe('restAPI E2E:', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000/')
  });

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('Rest API with Angular')
  });
  it('should link to a view', function() {
    element(by.css('a[href="#/login"')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login');
    element(by.css('a[href="#/shows"')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/shows');
    element(by.css('a[href="#/newshow"')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/newshow');
    element(by.css('a[href="#/newband"')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/newband');
  });

  var shows = element.all(by.repeater('show in shows'));
  it('should display a show', function() {
    element(by.css('a[href="#/shows"')).click();
    expect(shows.count()).toBe(1);
    expect(shows.get(0).venue.getText()).toEqual('test palace');

  });

});
