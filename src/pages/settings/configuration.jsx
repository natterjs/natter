// Libraries
import React from 'react';
import Store from 'electron-store';

// Components
import { Button } from 'semantic-ui-react'

export default class Configuration extends React.Component {
  render() {
    const userPreferences = new Store({
      name: 'user-preferences'
    })
    return (
      <div>
        <Button primary onClick={() => userPreferences.openInEditor()} >
          Edit Settings
        </Button>
      </div>
    )
  }
}
