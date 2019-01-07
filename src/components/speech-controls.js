import React from 'react';
import { Button } from 'semantic-ui-react';
const speech = require('../services/speech')

export default class SpeechControls extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={speech.start}>Launch speech</Button>
        <Button onClick={speech.stop}>Stop recording</Button>
      </div>
    );
  }
}
