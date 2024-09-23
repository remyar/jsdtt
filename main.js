const electron = require('electron');
var pjson = require('./package.json');
const backend = require('./src_backend');

require('@electron/remote/main').initialize();

let isDev = electron.app.isPackaged == false;

// Module to control application life.
const app = electron.app

app.commandLine.appendSwitch('disable-site-isolation-trials');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow() {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024, height: 768, webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
        //toolbar: false,
        //skipTaskbar: true,
    })

    mainWindow.setMenu(null);

    mainWindow.maximize();

    // and load the index.html of the app.
    mainWindow.loadURL(isDev ? `http://localhost:3000` : `file://${__dirname}/build/index.html`)
    //mainWindow.loadURL(`http://localhost:3000`)

    // Open the DevTools.
    isDev && mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    require("@electron/remote/main").enable(mainWindow.webContents);

    await backend.start(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
