import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// Libraries
import path from 'path'

export default class SettingsMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'Configuration'
    }
  }


  render () {
    const activate = (name) => this.setState({ activeItem: name })
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Link to="/">
          <Menu.Item
            name='Configuration'
            active={activeItem === 'Configuration'}
            onClick={() => activate('Configuration')}
            id='configuration'
          >
            Configuration
          </Menu.Item>
        </Link>
        <Link to="/grammars">
          <Menu.Item
            name='Grammars'
            active={activeItem === 'Grammars'}
            onClick={() => activate('Grammars')}
            id='grammars'
          >
            Grammars
          </Menu.Item>
        </Link>

        <Link to="/keyboard">
          <Menu.Item
            name='Keyboard'
            active={activeItem === 'Keyboard'}
            onClick={() => activate('Keyboard')}
            id='keyboard'
          >
            Keyboard
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}
