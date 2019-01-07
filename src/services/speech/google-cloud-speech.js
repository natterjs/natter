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
      data.results[0] && data.results[0].alternatives[0] ? sendResults(data) : startRecording()
    })
  )
}

// Send the results
const sendResults = (data) => {
  console.log(`Transcription: ${data.results[0].alternatives[0].transcript}\n`)
}

// Start recording and send the microphone input to the Speech API
const startRecording = () => {
  console.log(`Starting a new recording\n`)
  record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    verbose: false,
    recordProgram: 'rec',
    silence: '10.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream())
}

// Start recording and send the microphone input to the Speech API
const stopRecording = () => {
  console.log(`Stopping the recording\n`)
  record.stop()
}

module.exports.start = startRecording
module.exports.stop = stopRecording
