// Electron
import { app, BrowserWindow } from 'electron';
import { ipcMain } from 'electron'
const path = require('path')

// Libraries
import { enableLiveReload } from 'electron-compile';
import Store from 'electron-store';

// Services
import executors from './services/executors';
import parsers from './services/parsers';
import speech from './services/speech';

// Default settings and objects
import keyboard from './config/default-grammars/keyboard'

// Create user preferences store. On initial load they will need a keyboard
// But on the second load their keyboards should be stored.
const userPreferences = new Store({
  name: 'user-preferences',
  defaults: {
    speechAdapter: 'wit-ai-api',
    parser: 'simple-text-parser',
    executor: 'robot-js',
    keyboard: keyboard,
    api_keys: {
      wit: 'LWYUABH7YMDJ6NZRFYMU3EWR4AVKAEB3'
    }
  },
});


let mainWindow;
const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 980,
    minHeight: 60,
    maxHeight: 60,
    show: false,
    title: 'Natter',
    transparent: true,
    frame: false,
    x: 30,
    y: 70,
    icon: path.join(__dirname, 'assets/icons/64x64.png')
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Require the users preferred adapters from the store
const parser = userPreferences.get('parser');
const executor = userPreferences.get('executor');
const userKeyboard = userPreferences.get('keyboard');
const speechAdapter = 'wit-ai-api' // userPreferences.get('speechAdapter');

// Load the keyboard from the user preferences
//
// 1. We assign to the parser matches for each fo the words used for the keys
const setupKeyboard = () => {
  for (let key in keyboard.keys) {
    parsers[parser]['addKey'](
      RegExp("\\s{0,1}" + key + "\\s{0,1}"), 'key-tap',
      keyboard.keys[key]
      )
  }
}
setupKeyboard()

// Speech processing function used to inject into the speech api client
//
// 1. Broadacast to the main window to show the application is thinking
// 2. Parse the data by the selected parsing adapter
// 3. Execute the commands using the chosen executor
const processSpeech = (data) => {
  mainWindow.webContents.send('active-transcription', data);
  let dataTree = parsers[parser]['parse'](data);
  executors[executor]['tree'](dataTree);
}

// Encapsulating the speech broadcast callback function to start
// the currently configured speech adapter
//
// 1. Load the adapter using the user-preference
// 2. If we recieved start - begin recording, otherwise the command must be stop
ipcMain.on('toggle-speech', function(event, data) {
  const adapter = speech.adapters[speechAdapter]
  data === 'start' ? adapter.start(processSpeech, userPreferences) : adapter.stop();

  console.log(` ${new Date().toLocaleTimeString()} :: MAIN RECIEVED: => `, data)
});

// Add a build logger which recieved broadcasts from the renderers
//
// 1. This enables us to log events in the DOM without requiring dev-tools
ipcMain.on('build-log', function(event, data) {
  console.log(` ${new Date().toLocaleTimeString()} :: BUILD LOG: => `, data)
});
