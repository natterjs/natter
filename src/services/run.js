// Business logic //
//
// From here we boot all the Render and Main thread communication processes
// We instrument a custom logger to handle web console and main thread errors
// We load in the user preferences

// Libraries
import Store from 'electron-store'
import { ipcMain } from 'electron'

// Services
import executors from './executors'
import parsers from './parsers'
import speech from './speech'
import customLogger from './loggers/custom-logger'

// Default settings and objects
import keyboard from '../config/default-grammars/keyboard'

// Create user preferences store. On initial load they will need a keyboard
// But on the second load their keyboards should be stored.
const userPreferences = new Store({
  name: 'user-preferences',
  defaults: {
    speechAdapter: 'wit-ai-api',
    parser: 'simple-text-parser',
    executor: 'robot-js',
    keyboard: keyboard,
    'wit-ai-api': 'LWYUABH7YMDJ6NZRFYMU3EWR4AVKAEB3'
  }
})

const run = (mainWindow) => {
  // Require the users preferred adapters from the store
  const parser = userPreferences.get('parser')
  const executor = userPreferences.get('executor')
  const userKeyboard = userPreferences.get('keyboard')
  const speechAdapter = userPreferences.get('speechAdapter')
  console.log(speechAdapter)

  // Load the keyboard from the user preferences
  //
  // 1. We assign to the parser matches for each fo the words used for the keys
  const setupKeyboard = () => {
    for (let key in userKeyboard.keys) {
      parsers[parser]['addKey'](
        RegExp('\\s{0,1}' + key + '\\s{0,1}'), 'key-tap',
        userKeyboard.keys[key]
      )
    }
  }

  setupKeyboard()

  // Speech processing function used to inject into the speech api client
  //
  // 1. Broadcast to the main window to show the application is thinking
  // 2. Parse the data by the selected parsing adapter
  // 3. Execute the commands using the chosen executor
  const processSpeech = (data) => {
    mainWindow.webContents.send('active-transcription', data)
    let dataTree = parsers[parser]['parse'](data)
    executors[executor]['tree'](dataTree)
  }

  // Encapsulating the speech broadcast callback function to start
  // the currently configured speech adapter
  //
  // 1. Load the adapter using the user-preference
  // 2. If we received start - begin recording, otherwise the command must be stop
  ipcMain.on('toggle-speech', function (event, data) {
    console.log("toggleing is fun")
    const adapter = speech.adapters[speechAdapter]
    const config = userPreferences.get(speechAdapter)
    data === 'start' ? adapter.start(processSpeech, config) : adapter.stop()

    customLogger(data, 'TOGGLE SPEECH')
  })

  // Add a build logger which received broadcasts from the renderers
  //
  // 1. This enables us to log events in the DOM without requiring dev-tools
  ipcMain.on('log-catcher', function (event, data) {
    customLogger(data)
  })
}

export default run
