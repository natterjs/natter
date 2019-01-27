// Libraries
import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

// Components
import SpeechControls from '../speech/speech-controls'

const Navbar = (props) => (
  <SpeechControls speech={props.speech}/>
)

export default Navbar
