// Libraries
import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

// Components
import SpeechControls from '../speech/speech-controls'

const Navbar = (props) => (
  <Menu position='right'>
    <SpeechControls speech={props.speech}/>
  </Menu>
)

export default Navbar
