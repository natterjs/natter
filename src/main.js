// Electron
import { app, BrowserWindow } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { enableLiveReload } from "electron-compile";
import { ipcMain } from "electron"

// Libraries
import Store from "electron-store";

// Services
import executors from "./services/executors";
import parsers from "./services/parsers";
import speech from "./services/speech";

// Default settings and objects
import keyboard from "./config/default-grammars/keyboard"

// SetUp //
const isDevMode = process.env.NODE_ENV === "development"
const isDebugMode = (process.env.DEBUG === "true")
if (isDevMode) {
  enableLiveReload({ strategy: "react-hmr" });
}
// Create user preferences store. On initial load they will need a keyboard
// But on the second load their keyboards should be stored.
const userPreferences = new Store({
  name: "user-preferences",
  defaults: {
    speechAdapter: "google-speech-api",
    parser: "simple-text-parser",
    executor: "robot-js",
    keyboard: keyboard
  },
});

let toolbarSize = { minWidth: 1025, minHeight: 80, maxWidth: 1025, maxHeight: 80 }
let grammarSize = { minWidth: 1025, minHeight: 800, maxWidth: 1025, maxHeight: 800 }

let mainWindow;
const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 960,
    minHeight: 80,
    alwaysOnTop: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDebugMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});


const parser = userPreferences.get("parser");
const executor = userPreferences.get("executor");
const userKeyboard = userPreferences.get("keyboard");

const setupKeyboard = () => {
  for (let key in keyboard.keys) {
    parsers[parser]["addKey"](RegExp("\\s{0,1}" + key + "\\s{0,1}"), 'key-tap', keyboard.keys[key])
  }
}

setupKeyboard()

// Speech processing function used to inject into the speech api client
const processSpeech = (data) => {
  mainWindow.webContents.send('active-transcription', data);
  let dataTree = parsers[parser]["parse"](data);
  executors[executor]["tree"](dataTree);
}

// Encapsulating the speech broadcast callback function to start
// the currently configured speech adapter
ipcMain.on("toggle-speech", function(event, data) {
  console.log(`Main Recieved ->`);
  console.log(data);

  const speechAdapter = userPreferences.get("speechAdapter", "google-speech-api");
  const adapter = speech.adapters[speechAdapter]
  data === "start" ? adapter.start(processSpeech) : adapter.stop();
});


