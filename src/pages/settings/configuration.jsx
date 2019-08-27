// Libraries
import React from 'react';
import Store from 'electron-store';

// Components
import { Button, Container } from 'semantic-ui-react'

export default class Configuration extends React.Component {
  render() {
    const userPreferences = new Store({
      name: 'user-preferences'
    })

    return (
      <Container>
        <Button primary onClick={() => userPreferences.openInEditor()} >
          Edit Preferences
        </Button>
      </Container>
    )
  }
}
