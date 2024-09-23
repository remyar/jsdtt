import createAction from '../../middleware/actions';

export default {
    find: createAction(async ({ extra, getState }) => {
        try {
            let serialport = await extra.api.SerialPort.list();
            return {};
        } catch (err) {
            throw { message: err.message };
        }
    }),

}