// An executor is responsible for sending out the commands which we run on the machine
//
// @param data -> Array of Commands to Execute
//
// The executioner may not use the `is_complete` property; it perhaps will only receive a
// completely parsed string of commands or a serialised object of commands

import robot from 'robotjs';

const executeString = (data) => {
  console.log(`Executor Recieved ->`);
  console.log(data)
  if(data.complete) {
    robot.typeString(data.text);
    robot.keyTap("enter")
  }
}

const commands = {
  string: executeString
}

export default commands;
