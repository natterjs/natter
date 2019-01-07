// This file should continue to stream until we force quit
//
// When the single utterance is closed it should open a new connection

// Libraries
const record = require('node-record-lpcm16');
const googleSpeech = require('@google-cloud/speech');

// Broadcasters
import speechBroadcaster from '../broadcaster/speech-broadcaster'

// Creates a client
const client = new googleSpeech.SpeechClient();

// Configure request
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: true, // If you want interim results, set this to true
  singleUtterance: true,
};

// Create a recognize stream
const recognizeStream = () => {
  return (
    client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      data.results[0] && data.results[0].alternatives[0] ? sendResults(data) : restartRecording()
    })
  )
}

// Send the results
const sendResults = (data) => {
  speechBroadcaster(`Google Transcript: ${data.results[0].alternatives[0].transcript}`)
}

// Start recording and send the microphone input to the Speech API
const startRecording = () => {
  speechBroadcaster(`Starting Google Speech API recording\n`)
  record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    verbose: false,
    recordProgram: 'rec',
    silence: '15.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream())
}

const restartRecording = () => {
  record.stop()
  startRecording()
}

// Start recording and send the microphone input to the Speech API
const stopRecording = () => {
  speechBroadcaster(`Stopping Google Speech API recording\n`)
  record.stop()
}

module.exports.start = startRecording
module.exports.stop = stopRecording
