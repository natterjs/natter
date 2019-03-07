// Libraries
import React from 'react'

// Components
import Navbar from './components/navigation/navbar'

// Services
import speech from './services/speech'

export default class App extends React.Component {
  render(){
    return (
      <div>
        <Navbar speech={speech} />
      </div>
    )
  }
}
