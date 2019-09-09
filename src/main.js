// main //
//
// Main creates all the windows required for running the app.
//
// If windows are toggle from renders it should be handled here as well
// using a broadcaster.

// Libraries
import { app, BrowserWindow } from 'electron'
import { ipcMain } from 'electron'
import path from 'path'

// Run - The main function
import run from './services/run'

let mainWindow

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
  })

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
    mainWindow = null
  })
}

let settingsWindow = null

const openSettingsWindow = async () => {
  if (settingsWindow === null) {
    // Create the browser window.
    settingsWindow = new BrowserWindow({
      title: 'Natter - Settings',
      show: false,
      icon: path.join(__dirname, 'assets/icons/64x64.png')
    })
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
  })
}

// Allow the renderer thread to call for a new window to be opened
ipcMain.on('open-settings-window', function (event, data) {
  openSettingsWindow()
})

// This method will be called when Electron has finished initialization
app.on('ready', () => {
  createMainWindow().then(() => {
    run(mainWindow)
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Create the window if we try and context switch and it is closed
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})
