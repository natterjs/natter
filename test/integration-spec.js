const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')

describe('Application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: __dirname + '/../node_modules/.bin/electron',
      args: [__dirname + '/../src/index.js']
    })
    return this.app.start()
  })

  afterEach(function () {
    if (app && app.isRunning()) {
      return this.app.stop();
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 3)
    })
  })
})
