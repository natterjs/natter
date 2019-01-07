// Libraries
import React from 'react';
import { Container } from 'semantic-ui-react'


// Components
import Navbar from './components/navigation/navbar.js'
import ScratchPad from './components/elements/scratch-pad.js'

// Configuration
import config from './config/config'

// Services
import speech from './services/speech'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar speech={speech} />
        <Container>
          <ScratchPad />
        </Container>
      </div>
    );
  }
}
