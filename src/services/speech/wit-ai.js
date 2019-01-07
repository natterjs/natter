// Libraries
const record = require('node-record-lpcm16')
const request = require('request')

// Configuration
const config = require('../../config/config')

exports.parseResult = function (err, resp, body) {
  console.error("Broadcasting is not supported for this API")
  console.log(body)
}

const startRecording = () => {
  record.start().pipe(request.post({
    'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
    'headers' : {
      'Accept'        : 'application/vnd.wit.20160202+json',
      'Authorization' : 'Bearer ' + config.witToken,
      'Content-Type'  : 'audio/wav'
    }
  }, exports.parseResult))
}

const stopRecording = () => {
  record.stop()
}

module.exports.start = startRecording
module.exports.stop = stopRecording
