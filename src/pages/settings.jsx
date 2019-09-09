// Libraries
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Store from 'electron-store'

// Import pages
import Configuration from './settings/configuration'
import Grammars from './settings/grammars'
import Keyboard from './settings/keyboard'

// Components
import SettingsMenu from '../components/settings/settings-menu'

export default class Settings extends React.Component {

  render() {
    // Grab the full set of preferences
    const userPreferences = new Store({
      name: 'user-preferences'
    })

    return (
      <Router>
        <div>
        <SettingsMenu />
          <Switch>
            <Route exact path='/' >
              <Configuration />
            </Route>
            <Route path='/grammars' >
              <Grammars />
            </Route>
            <Route path='/keyboard'>
              <Keyboard keyboard={userPreferences.get('keyboard', 'keys')}/>
            </Route>
            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    )
  }
}
