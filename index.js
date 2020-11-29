const fs = require("fs");
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Load in the config settings
const config = JSON.parse(fs.readFileSync("./config/config.json"));

app.commandLine.appendSwitch("ignore-certificate-errors", "true");

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  },
  titleBarStyle: "hiddenInset"
  });

  mainWindow.maximize();

  mainWindow.removeMenu();

  mainWindow.loadURL(`https://${config.ServerAddress}:${config.ServerPort}`);

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});