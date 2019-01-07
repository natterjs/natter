// Libraries
import React from 'react';
import { Button } from 'semantic-ui-react';

// Services
const speech = require('../../services/speech')

export default class SpeechControls extends React.Component {
  constructor() {
    super()
    this.state = {
      recording: false
    }
  }

  render() {
    const toggleSpeech = () => {
      let recording = this.state.recording
      this.setState({
        recording: !recording
      })
    }

    const start = () => {
      toggleSpeech()
      return speech.start()
    }

    const stop = () => {
      toggleSpeech()
      return speech.stop()
    }

    return (
      <Button.Group>
        <Button positive disabled={this.state.recording} onClick={start}>Launch speech</Button>
          <Button.Or text='' />
        <Button negative disabled={!this.state.recording} onClick={stop}>Stop speech</Button>
      </Button.Group>
    );
  }
}
