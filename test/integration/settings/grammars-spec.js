const testhelper = require("../../support/spectron-helper");
const app = testhelper.initialiseSpectron();
const assert = require('assert')

const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");
chai.should();
chai.use(chaiAsPromised);

describe("Settings - Grammars", function () {
  this.timeout(30000)

  // Start spectron
  before(function () {
    chaiAsPromised.transferPromiseness = app.transferPromiseness;
    return app.start();
  });

  // Stop Electron
  after(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  describe("page", function () {
    it("has default content", function () {
      app.client.element('#open-settings').click()
      return app.client.windowByIndex(1).getText('#grammars').should.eventually.equal("Grammars")
    });
  });
});
