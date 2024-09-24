const { app, ipcMain } = require('electron');
const {SerialPort} = require('serialport');
const Device = require('./Devices');
const Ecu = require('./Ecus');
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

            ipcMain.handle('SerialPort.list', async (event, value) => {
                return await SerialPort.list();
            });

            Object.keys(Device).forEach((key) => {
                ipcMain.handle('Device.' + key, async (event, value) => {
                    return (await Device[key](value));
                });
            });

            Object.keys(Ecu).forEach((key) => {
                ipcMain.handle('Ecu.' + key, async (event, value) => {
                    return (await Ecu[key](value));
                });
            });
        } catch (err) {
            console.error(err);
        }
    }
}