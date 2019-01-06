import React from 'react';
import SpeechControls from './components/speech-controls.js'

export default class App extends React.Component {
  render() {
    return (<div>
      <h2>Welcome to Voicebox!</h2>
      <SpeechControls />
    </div>);
  }
}
