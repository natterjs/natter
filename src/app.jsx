// Libraries
import React from 'react';
import { Container } from 'semantic-ui-react'

// Components
import Navbar from './components/navigation/navbar.js'

// Services
import speech from './services/speech'

export default class App extends React.Component {
  render() {
    return (
      <Navbar speech={speech} />
    );
  }
}
