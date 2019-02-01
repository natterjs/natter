// Libraries
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Switch, Route } from "react-router-dom"

// Pages
import Grammars from './pages/grammars'
import Rules from './pages/rules'
import Configuration from './pages/configuration'

// Components
import Navbar from './components/navigation/navbar'
import MenuExampleVertical from './components/navigation/menu-example-vertical'

// Services
import speech from './services/speech'

export default class Pages extends React.Component {
  render(){
    return (
      <div>
        <Navbar speech={speech} />
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <MenuExampleVertical />
            </Grid.Column>
            <Grid.Column width={11}>
              <Switch>
                <Route path="/grammars" exact component={ Grammars } />
                <Route path="/rules" exact component={ Rules } />
                <Route path="/configuration" exact component={ Configuration } />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
