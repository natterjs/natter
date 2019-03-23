// Libraries
import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

// Import pages
import Configuration from './settings/configuration'
import Grammars from './settings/grammars'
import Keyboard from './settings/keyboard'

// Components
import SettingsMenu from '../components/settings/settings-menu'

export default class Settings extends React.Component {
  render(){
    return (
    <Router>
      <div>
      <SettingsMenu />
        <hr />
        <Switch>
          <Route exact path="/" component={Configuration} />
          <Route path="/grammars" component={Grammars} />
          <Route path="/keyboard" component={Keyboard} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
    )
  }
}
