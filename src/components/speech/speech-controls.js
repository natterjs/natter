// Libraries
import React from 'react'
import { Button, Menu, Input } from 'semantic-ui-react'
import { ipcRenderer } from 'electron'

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
      let recording = !this.state.recording
      let thinking = !this.state.thinking
      let command = recording ? 'start' : 'stop'
      let transcript = recording ? 'Listening...' : 'Standby'

      this.setState({
        recording: recording,
        thinking: thinking,
        transcript: transcript
      })

      return broadcasters['client']('toggle-speech', command)
    }

    const openSettings = () => {
      return broadcasters['client']('open-settings-window', '')
    }

    const renderLoading = () => {
      return (
        <Input
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
            <Button positive toggle loading={this.state.thinking} onClick={toggleSpeech}>rec</Button>
            <Button information onClick={openSettings} id='open-settings'>menu</Button>
          </Button.Group>
        </Menu.Item>
        <Menu.Item id='draggable-handle'>
          <div></div>
        </Menu.Item>
      </Menu>
    );
  }
}
