const { SerialPort } = require('serialport');

module.exports = {
    list: async () => {
        try {
            return await SerialPort.list();
        } catch (err) {
            throw Error(err);
        }

    }
}