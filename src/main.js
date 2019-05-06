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
import customLogger from './services/loggers/custom-logger'

// Default settings and objects
import keyboard from './config/default-grammars/keyboard'

let mainWindow;

const createMainWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 1014,
    maxWidth: 1014,
    minHeight: 60,
    maxHeight: 60,
    title: 'Natter',
    show: false,
    frame: false,
    x: 30,
    y: 70,
    icon: path.join(__dirname, 'assets/icons/64x64.png')
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/windows/app.html`)
  // and when it's ready to show reveal it
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    }
  })
  // and ensure it cannot be hidden when closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

let settingsWindow = null

const openSettingsWindow = async () => {
  if (settingsWindow === null) {
    // Create the browser window.
    settingsWindow = new BrowserWindow({
      title: 'Natter - Settings',
      show: false,
      icon: path.join(__dirname, 'assets/icons/64x64.png')
    });
    // and load the index.html of the app.
    settingsWindow.loadURL(`file://${__dirname}/windows/settings.html`)
    // and when it's ready to show reveal it
    settingsWindow.once('ready-to-show', () => {
      settingsWindow.show()
      if (process.env.NODE_ENV === 'development') {
        settingsWindow.webContents.openDevTools({ mode: 'detach' })
      }
    })
  } else {
    settingsWindow.focus()
  }
  // and ensure it cannot be hidden when closed
  settingsWindow.on('closed', () => {
    settingsWindow = null
  });
}

// Allow the renderer thread to call for a new window to be opened
ipcMain.on('open-settings-window', function(event, data) {
  openSettingsWindow()
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow)

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
    createMainWindow()
  }
});

// Business logic //

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
});

// Require the users preferred adapters from the store
const parser = userPreferences.get('parser')
const executor = userPreferences.get('executor')
const userKeyboard = userPreferences.get('keyboard')
const speechAdapter = userPreferences.get('speechAdapter')

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
  const { apiKey } = userPreferences.get(speechAdapter)
  data === 'start' ? adapter.start(processSpeech, apiKey) : adapter.stop();

  customLogger(data, 'TOGGLE SPEECH')
});

// Add a build logger which recieved broadcasts from the renderers
//
// 1. This enables us to log events in the DOM without requiring dev-tools
ipcMain.on('log-catcher', function(event, data) {
  customLogger(data)
});
