// This is a wrapper for logging to the main thread from any application

// Libraries
import broadcasters from '../broadcasters'

// We will lgo messages on the main thread so that we don't require
// developer tools to debug.
//
// 1. If we are on a render thread we broadcast back onto the main thread
// 2. If we are on the main thread we will console.log the message
const customLogger = (data, location = 'DOM') => {
  let isRenderer = (process && process.type === 'renderer')

  if (isRenderer) {
    broadcasters['client']('log-catcher', data)
  } else {
    console.log(` ${new Date().toLocaleTimeString()} :: ${location}: => `, data)
  }
}

export default customLogger;
