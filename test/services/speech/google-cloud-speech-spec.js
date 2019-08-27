// Libraries
const chai = require("chai")
const rewire = require("rewire")

const expect = chai.expect

// Services
// Use rewire to get/set un-exported functions
var googleCloudSpeechModule = rewire('../../../src/services/speech/google-cloud-speech.js')

describe('Google Cloud Speech API', function () {
  describe('.start', function () {
    it('is in the public API', function () {
      // googleCloudSpeechModule.start()
    })

    it('handles remote API failure', function () {
      console.log("PENDING")
    })
  })

  describe('.stop', function () {
    it('is in the public API', function () {
      googleCloudSpeechModule.stop()
    })
  })
})
