// Libraries
import React from 'react'
import { Switch, Route } from "react-router-dom"

// Pages
import Grammars from './pages/grammars'

// Components
import Navbar from './components/navigation/navbar'

// Services
import speech from './services/speech'

export default class Pages extends React.Component {
  render(){
    return (
      <div>
        <Navbar speech={speech} />
        <Switch>
          <Route path="/" exact component={ Grammars } />
       </Switch>
     </div>
    )
  }
}
