// Libraries
import React from 'react'
import { HashRouter } from "react-router-dom"

// Pages
import Pages from './pages'

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Pages />
      </HashRouter>
    );
  }
}
