const { app, ipcMain } = require('electron');
const SerialPort = require('./SerialPort');
const Device = require('./Device');

let isDev = !app.isPackaged;

module.exports = {
    start: async (_mainWindow) => {
        try {
            ipcMain.handle('OPEN_DEV_TOOLS', (event, value) => {
                if (value) {
                    _mainWindow.webContents.openDevTools();
                } else {
                    _mainWindow.webContents.closeDevTools();
                }
            });
            Object.keys(SerialPort).forEach((key) => {
                ipcMain.handle('SerialPort.' + key, async (event, value) => {
                    return (await SerialPort[key](value));
                });
            });
            Object.keys(Device).forEach((key) => {
                ipcMain.handle('Device.' + key, async (event, value) => {
                    return (await Device[key](value));
                });
            });
        } catch (err) {
            console.error(err);
        }
    }
}