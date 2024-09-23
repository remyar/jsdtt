import createAction from '../../middleware/actions';

export default {
    find: createAction(async ({ extra, getState }) => {
        try {

            return {};
        } catch (err) {
            throw { message: err.message };
        }
    }),

}