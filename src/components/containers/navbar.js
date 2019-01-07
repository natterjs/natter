// Libraries
import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

// Components
import SpeechControls from '../speech/speech-controls'

const Navbar = () => (
  <Menu position='right'>
    <Menu.Menu position='right'>
      <Menu.Item>
        <SpeechControls />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)

export default Navbar
