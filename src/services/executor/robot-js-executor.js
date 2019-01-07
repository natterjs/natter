// Type "Hello World" then press enter.
// Libraries
import robot from 'robotjs';

const executeString = (arg) => {
  console.log(`Executor Recieved -> ${arg.text}`);
  if(arg.complete) {
    console.log('Printing...')
    robot.typeString(arg.text);
    robot.keyTap("enter")
  }
}

export default executeString;
