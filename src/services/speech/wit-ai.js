// This module sends data to wit AI when the user speaks
//
// It exports it's required start and stop commands

// Libraries
const record = require('node-record-lpcm16')
const request = require('request')

// Configuration
const config = require('../../config/config')

// We relie on sox for audio streaming - this active will break it's loop
// calls when we toggle it
let active = false

const recorder = (processSpeech) => {
  const parseResult = function (err, resp, body) {
    restartRecording(processSpeech)
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
  }).pipe(postAudioData(parseResult))
}

const startRecording = (callBack) => {
  active = true
  recorder(callBack)
}

const restartRecording = (callBack) => {
  if (active) {
    recorder(callBack)
  }
}

const stopRecording = () => {
  active = false
  record.stop()
}

// Create a recognize stream
const postAudioData = (callBack) => {
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

module.exports.start = startRecording
module.exports.stop = stopRecording
