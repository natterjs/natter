const testhelper = require('../support/spectron-helper')
const app = testhelper.initialiseSpectron()
const assert = require('assert')

const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
chai.should()
chai.use(chaiAsPromised)

describe('Settings page', function () {
  this.timeout(30000)

  // Start spectron
  before(function () {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
    return app.start()
  })

  // Stop Electron
  after(function () {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  describe('window', function () {
    // click on link in sidebar
    it('window will open when clicking on the settings button', function () {
      app.client.element('#open-settings').click()
      return app.client.getTitle().should.eventually.equal('Natter - Settings')
    })
  })
})
