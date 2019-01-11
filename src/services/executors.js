// Executors are used in order to send information to the system
//
// These executors use a consistent API which will read the commands
// sent by the parsers and send them to the operators machine

import commands from './executor/robot-js-executor'

const executors = {
  'robot-js': commands
}

export default executors
