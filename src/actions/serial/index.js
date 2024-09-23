import createAction from '../../middleware/actions';

export default {
    list: createAction(async ({ extra, getState }) => {
        try {
            let result = await extra.electron.ipcRenderer.invoke("Device.connect");
            //let serialport = await extra.api.SerialPort.list();
            return { serialport: serialport };
        } catch (err) {
            throw { message: err.message };
        }
    }),

}