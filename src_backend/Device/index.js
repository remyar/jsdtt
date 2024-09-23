const Device = require('./Device')
const { SerialPort } = require('serialport');


module.exports = {
    connect: async () => {
        try {
            let _serials = await SerialPort.list();

            _serials = _serials.filter((e) => e.productId == "6015" && e.vendorId == "0403");

            let __device = new Device(_serials[0].path, 115200);

            console.log(_serials)
        } catch (err) {
            throw err;
        }



        let _device = new Device();
    }
}