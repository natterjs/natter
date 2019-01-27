// Libraries
import React from 'react';
import { Button, Dropdown, Menu, Input } from 'semantic-ui-react';
import Store from "electron-store";
const { ipcRenderer } = require('electron')

// Services
import broadcasters from '../../services/broadcasters'

// Data
const userPreferences = new Store({
  name: "user-preferences"
});

export default class SpeechControls extends React.Component {
  constructor() {
    super()
    this.state = {
      recording: false,
      adapter: userPreferences.get("speechAdapter"),
      transcript: "Standby"
    }
    // Render the transcript as we speak
    ipcRenderer.on('file-save', (event, data) => {
      let newTranscript = data.text
      if (newTranscript !== this.state.transcript) {
        this.setState({
          transcript: newTranscript
        })
      }
    });
  }

  render() {
    const speech = this.props.speech
    const adapter = speech.adapters[this.state.adapter]

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

    const selectOptions = (object) => {
      let options = Object.keys(object).map((adapter) => (
        { key: adapter, value: adapter, text: adapter }
      ))
      return options
    }

    const selectAdapter = (e) => {
      let adapter = e.target.textContent
      this.setState({
        adapter: adapter
      })
      return userPreferences.set("speechAdapter", adapter);
    }

    const renderLoading = () => {
      return (
        <Input
          loading={this.state.recording}
          value={this.state.transcript}
          style={{ width:"650px" }}
           />
      )
    }

    return (
      <Menu size="tiny">
        <Menu.Item>
          {renderLoading()}
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Dropdown
              placeholder='Select adapter'
              options={selectOptions(speech.adapters)}
              defaultValue={this.state.adapter}
              onChange={selectAdapter}
              disabled={this.state.recording}
              />
          </Menu.Item>
          <Menu.Item>
            <Button.Group>
              <Button positive disabled={this.state.recording} onClick={start}>Start</Button>
              <Button.Or text='' />
              <Button negative disabled={!this.state.recording} onClick={stop}>Stop</Button>
            </Button.Group>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
