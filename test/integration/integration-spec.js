const testhelper = require("../support/spectron-helper");
const app = testhelper.initialiseSpectron();

const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");
chai.should();
chai.use(chaiAsPromised);

describe("Example integrations spec", function () {
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

  describe("start Up", function () {
    // wait for Electron window to open
    // When it is headless in CI it is 1
    // When running locally it is 2
    it('opens application window', function () {
      return app.client.waitUntilWindowLoaded().getWindowCount()
      .should.eventually.above(1);
    });
  });
});
