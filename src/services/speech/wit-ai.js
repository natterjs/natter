// This module sends data to wit AI when the user speaks
//
// It exports it's required start and stop commands

// Libraries
import record from 'node-record-lpcm16'
import request from 'request'

//Services
import customLogger from '../loggers/custom-logger'

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
      console.log(message)
      console.log(body)
      processSpeech(message)
      customLogger('Producing message...', 'WIT AI SPEECH')
      customLogger(message, 'WIT AI SPEECH')
    }
  }

  record.start({
    recordProgram: 'rec',
    verbose: true,
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

const startRecording = (callBack, apiKey) => {
  customLogger(apiKey, 'API KEY')
  active = true
  recorder(callBack, apiKey)
  customLogger('Recording Started', 'WIT AI SPEECH')
}

const restartRecording = (callBack, apiKey) => {
  if (active) {
    recorder(callBack, apiKey)
    customLogger('Recording Restarted', 'WIT AI SPEECH')
  }
}

const stopRecording = () => {
  active = false
  record.stop()
  customLogger('Recording Stopped', 'WIT AI SPEECH')
}

module.exports.start = startRecording
module.exports.stop = stopRecording
