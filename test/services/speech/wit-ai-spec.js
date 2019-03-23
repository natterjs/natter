// Libraries
const chai = require("chai");
const sinon = require("sinon")
const rewire = require("rewire");

const expect = chai.expect;

// Services
// Use rewire to get/set un-exported functions
var witAiSpeechModule = rewire('../../../src/services/speech/wit-ai.js');

describe('WIT AI Speech API', function () {
  describe('.start', function () {
    it('is in the public API', function () {
      witAiSpeechModule.start()
    })

    it('handles remote API failure', function () {
      console.log("PENDING")
    })
  })

  describe('.stop', function () {
    it('is in the public API', function () {
      witAiSpeechModule.stop()
    })
  })
})
