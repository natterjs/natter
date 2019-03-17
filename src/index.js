// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Services
import broadcasters from './services/broadcasters'

const render = () => {
  broadcasters['client']('build-log', 'Mounting react to DOM')
  const App = require('./app').default;
  ReactDOM.render(<App />, document.getElementById('App'));
}

render();
