// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Services
import customLogger from './services/loggers/custom-logger'

const render = () => {
  const App = require('./app').default;
  ReactDOM.render(<App />, document.getElementById('App'));
  customLogger('Mounting React')
}

render();
