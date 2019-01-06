import React from 'react';
const speech = require('../services/speech/google-cloud-speech')

export default class SpeechControls extends React.Component {
  render() {
    return (
      <div>
        <button onClick={speech.start}>Launch speech</button>
        <button onClick={speech.stop}>Stop recording</button>
      </div>
    );
  }
}
