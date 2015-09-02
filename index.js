var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var dialog = require('dialog');
var fs = require('fs-extra');

// Report crashes to our server.
// require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OSX it is common for applications and their menu bar 
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  var screen = require('screen');
  var size = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({width: 356, height: 406, x: size.width - 356, y: 0});
  
  var configFile = app.getPath('appData') + '/Lifening/lifening-config.json';
  console.log(configFile);
  
  var config = {};
  
  try {
    config = require(configFile);
    loadWindowWithConfig(config);
  } catch (e) {
    // Let's get Lifening set up. First locate your config file.
    var newConfigFile = dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'JSON file', extensions: ['json'] }
      ],
      title: 'Find config.json'
    });
    fs.copy(newConfigFile[0], configFile, function(err) {
      if (err) return console.log(err);
      config = require(configFile);
      loadWindowWithConfig(config);
    });
  }

  // Open the devtools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

function loadWindowWithConfig(config) {
  // load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html#'+encodeURI(JSON.stringify(config)));
}
