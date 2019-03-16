// Libraries
const record = require('node-record-lpcm16')
const request = require('request')

// Configuration
const config = require('../../config/config')

// Create a recognize stream
const recognizeStream = (callBack) => {
  return (
    request.post({
        'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
        'headers' : {
          'Accept': 'application/vnd.wit.20160202+json',
          'Authorization': 'Bearer ' + config.witToken,
          'Content-Type': 'audio/wav'
        }
      }, callBack)
  )
}

const startRecording = (processSpeech) => {

  const parseResult = function (err, resp, body) {
    startRecording(processSpeech)
    let data = JSON.parse(body)
    let message = {
      text: data["_text"],
      complete: true
    }
    console.log("Wit AI sending =>", message)
    processSpeech(message)
  }

  record.start({
    verbose: true,
    recordProgram: 'rec',
    silence: '0.5',
    threshold: 5
  }).pipe(recognizeStream(parseResult))
}

const stopRecording = () => {
  record.stop()
}

module.exports.start = startRecording
module.exports.stop = stopRecording
