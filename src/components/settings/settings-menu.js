import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link} from "react-router-dom";

// Assets
const path = require('path')
console.log(". = %s", path.resolve("."));
console.log("__dirname = %s", path.resolve(__dirname));

export default class SettingsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { activeItem } = this.state
    const handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    return (
      <Menu stackable>
        <Menu.Item>
          <img src={`file:\/\/${path.resolve(".")}/src/assets/icons/64x64.png`} />
        </Menu.Item>
        <Link to="/">
          <Menu.Item
            name='Configuration'
            active={activeItem === 'Configuration'}
            onClick={this.handleItemClick}
          >
            Configuration
          </Menu.Item>
        </Link>
        <Link to="/grammars">
          <Menu.Item
            name='Grammars'
            active={activeItem === 'Grammars'}
            onClick={this.handleItemClick}
          >
          Grammars
        </Menu.Item>
        </Link>

        <Link to="/keyboard">
          <Menu.Item name='Keyboard' active={activeItem === 'Keyboard'} onClick={this.handleItemClick}>
            Keyboard
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}
