const { app, ipcMain } = require('electron');
const ELM = require('./elm');

let isDev = !app.isPackaged;

module.exports = {
    start: async (_mainWindow) => {
        try {
            let elm = new ELM("COM17", 38400, "STD_USB");

            await elm.__init__();

            ipcMain.handle('OPEN_DEV_TOOLS', (event, value) => {
                if (value) {
                    _mainWindow.webContents.openDevTools();
                } else {
                    _mainWindow.webContents.closeDevTools();
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}