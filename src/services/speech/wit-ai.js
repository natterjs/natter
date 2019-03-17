// This module sends data to wit AI when the user speaks
//
// It exports it's required start and stop commands

// Libraries
import record from 'node-record-lpcm16'
import request from 'request'

const customLogger = (message) =>  console.log(` ${new Date().toLocaleTimeString()} :: WIT AI SPEECH: => `, message)

// We relie on sox for audio streaming - this active will break it's loop
// calls when we toggle it
let active = false

const recorder = (processSpeech, apiKey) => {
  const parseResult = function (err, resp, body) {
    restartRecording(processSpeech, apiKey)
    let data = JSON.parse(body)
    let message = {
      text: data['_text'],
      complete: true
    }
    if (active) {
      processSpeech(message)
      customLogger('Producing message...')
      customLogger(message)
    }
  }

  record.start({
    recordProgram: 'rec',
    silence: '0.5',
    threshold: 5
  }).pipe(postAudioData(parseResult, apiKey))
}

// Create a recognize stream
const postAudioData = (callBack, apiKey) => {
  return (
    request.post({
        'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
        'headers' : {
          'Accept': 'application/vnd.wit.20160202+json',
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'audio/wav'
        }
      }, callBack)
  )
}

const startRecording = (callBack, userPreferences) => {
  active = true
  recorder(callBack, userPreferences.get('api_keys.wit'))
  customLogger('Recording Started')
}

const restartRecording = (callBack) => {
  if (active) {
    recorder(callBack)
    customLogger('Recording Retarted')
  }
}

const stopRecording = () => {
  active = false
  record.stop()
  customLogger('Recording Stopped')
}

module.exports.start = startRecording
module.exports.stop = stopRecording
