// This file should continue to stream until we force quit
//
// When the single utterance is closed it should open a new connection

// Libraries
const record = require('node-record-lpcm16');
const googleSpeech = require('@google-cloud/speech');

// Creates a client
const client = new googleSpeech.SpeechClient();

// Configure request
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-GB';

//Services
import customLogger from '../loggers/custom-logger'

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  },
  interimResults: true, // If you want interim results, set this to true
  singleUtterance: true,
};

// Create a recognize stream
const recognizeStream = (processSpeech) => {
  return (
    client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      data.results[0] && data.results[0].alternatives[0] ? sendResults(data, processSpeech) : restartRecording(processSpeech)
    })
  )
}

// Send the results
const sendResults = (data, callback) => {
  let message = {
    text: data.results[0].alternatives[0].transcript,
    complete: data.results[0].isFinal,
  }
  callback(message)
  customLogger(message, 'GOOGLE SPEECH')
}

// Start recording and send the microphone input to the Speech API
const startRecording = (processSpeech) => {

  record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    recordProgram: 'rec',
    silence: '15.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream(processSpeech))
  customLogger("Recording Started")
}

const restartRecording = (processSpeech) => {
  record.stop()
  startRecording(processSpeech)
  customLogger("Recording Restarted", 'GOOGLE SPEECH')
}

// Start recording and send the microphone input to the Speech API
const stopRecording = () => {
  record.stop()
  customLogger("Recording Stopped", 'GOOGLE SPEECH')
}

module.exports.start = startRecording
module.exports.stop = stopRecording
