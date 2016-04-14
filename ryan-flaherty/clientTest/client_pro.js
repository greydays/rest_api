/* in separate terminal tabs:
  ~$ pyserve
  ~$ webdriver-manager start
  ~$ protractor protractor-conf.js
*/

describe('our first angular test homepage', function() {
  var firstName = element(by.model('namectrl.firstName'))
  var lastName = element(by.model('namectrl.lastName'))
  var updateButton = element(by.buttonText('Update Name'))

  beforeEach(function() {
    browser.get('http://localhost:8000/')
  })

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('My First Angular Test')
  })

  it('should have a default name', function() {
    expect(firstName.getAttribute('value')).toEqual('Peggy')
    expect(lastName.getAttribute('value')).toEqual('Hill')
    expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Peggy Hill')
  })

  it('can update the name', function() {
    firstName.clear()
    firstName.sendKeys('Bobby')
    lastName.clear()
    lastName.sendKeys('UstaHill')
    updateButton.click()

    expect(firstName.getAttribute('value')).toEqual('Bobby')
    expect(lastName.getAttribute('value')).toEqual('UstaHill')
    expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Bobby UstaHill')
  })

})
