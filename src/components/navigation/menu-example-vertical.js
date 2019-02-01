import React, { Component } from 'react'
import { Input, Label, Menu, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom"

export default class MenuExampleVertical extends Component {
  constructor(){
    super()
    this.state = { activeItem: 'grammars' }
  }

  render() {
    const { activeItem } = this.state

    this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    return (
      <Menu pointing secondary vertical>
        <Link to="/grammars">
          <Menu.Item name='grammars' active={activeItem === 'grammars'} onClick={this.handleItemClick}>
            <Header as='h4'>Grammars</Header>
            <p>Design your speech to fit your needs</p>
          </Menu.Item>
        </Link>

        <Link to="/rules">
          <Menu.Item name='rules' active={activeItem === 'rules'} onClick={this.handleItemClick}>
            <Header as='h4'>Rules</Header>
            <p>Custom JS functions to transform your recognition results</p>
          </Menu.Item>
        </Link>

        <Link to="/configuration">
          <Menu.Item name='configuration' active={activeItem === 'configuration'} onClick={this.handleItemClick}>
            <Header as='h4'>Configuration</Header>
            <p>Add access keys to services and extend voicebox</p>
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}
