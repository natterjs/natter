// Libraries
import React from 'react';
import { Button, Menu, Input } from 'semantic-ui-react';
const { ipcRenderer } = require('electron')

// Services
import broadcasters from '../../services/broadcasters'
import customLogger from '../../services/loggers/custom-logger'

export default class SpeechControls extends React.Component {
  constructor() {
    super()
    this.state = {
      recording: false,
      transcript: "Standby",
      thinking: false
    }
    // Render the transcript as we speak
    ipcRenderer.on('active-transcription', (event, data) => {
      let newTranscript = data.text
      let thinking = data.complete
      if (newTranscript !== this.state.transcript) {
        this.setState({
          transcript: newTranscript,
          thinking: !thinking,
        })
      }
    });
  }

  render() {
    customLogger('Mounting Speech Controls to DOM')

    const toggleSpeech = () => {
      let recording = this.state.recording
      this.setState({
        recording: !recording
      })
    }

    const start = () => {
      toggleSpeech()
      this.setState({
        transcript: "Listening..."
      })
      return broadcasters['client']('toggle-speech', 'start')
    }

    const stop = () => {
      toggleSpeech()
      this.setState({
        transcript: "Standby"
      })
      return broadcasters['client']('toggle-speech', 'stop')
    }

    const openSettings = () => {
      return broadcasters['client']('open-settings-window', '')
    }

    const renderLoading = () => {
      return (
        <Input
          loading={this.state.thinking}
          value={this.state.transcript}
          disabled={!this.state.recording}
          inverted
          style={{ minWidth:"800px" }}
           />
      )
    }

    return (
      <Menu>
        <Menu.Item>
          {renderLoading()}
        </Menu.Item>
          <Menu.Item>
          <Button.Group>
            <Button positive disabled={this.state.recording} onClick={start}>on</Button>
            <Button.Or text='S' onClick={openSettings} id='open-settings' />
            <Button negative disabled={!this.state.recording} onClick={stop}>off</Button>
          </Button.Group>
        </Menu.Item>
        <Menu.Item id='draggable-handle'>
          <span>...</span><br/>
          <span>...</span><br/>
          <span>...</span>
        </Menu.Item>
      </Menu>
    );
  }
}
