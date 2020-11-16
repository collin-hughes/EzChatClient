const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

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
  }
  });

  mainWindow.maximize();

  mainWindow.removeMenu();

  mainWindow.loadURL("https://192.168.1.12:5000/");

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});