const testhelper = require("../support/spectron-helper")
const app = testhelper.initialiseSpectron()

const chaiAsPromised = require("chai-as-promised")
const chai = require("chai")
chai.should()
chai.use(chaiAsPromised)

describe("App page", function () {
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

  describe("start Up", function () {
    it("has an App div", function () {
      return app.client.element('#App').click()
    })
  })
})
