import createAction from '../../middleware/actions';

export default {
    init: createAction(async ({ extra, getState }) => {
        try {
            let result = await extra.electron.ipcRenderer.invoke("Ecu.init");
            return { EcuInit: result };
        } catch (err) {
            throw { message: err.message };
        }
    }),

}