import createAction from '../../middleware/actions';

export default {
    list: createAction(async ({ extra, getState }) => {
        try {
            let result = await extra.electron.ipcRenderer.invoke("Device.find");

            return { serialport: result };
        } catch (err) {
            throw { message: err.message };
        }
    }),

}