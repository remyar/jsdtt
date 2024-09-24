import createAction from '../../middleware/actions';

export default {
    find: createAction(async ({ extra, getState }) => {
        try {
            let result = await extra.electron.ipcRenderer.invoke("Device.find");
            return { DeviceFind: result };
        } catch (err) {
            throw { message: err.message };
        }
    }),

}