const Device = require('./Device')
const { SerialPort } = require('serialport');

let device = undefined;

const usbDevices = [
    { vendorId: '0403', productId: '6015' },
    { vendorId: '0403', productId: '6001' },
]

module.exports = {
    find: async () => {
        try {
            const ports = (await SerialPort.list()).map((p) => {
                let usbDevice = usbDevices.find((usb) => usb.vendorId == p.vendorId && usb.productId == p.productId);
                if (usbDevice) {
                    return { path: p.path, devices: usbDevice.devices };
                }
            }).filter((f) => f != undefined);

            const arrayPromise = [];
            const devices = [];
            for (let p of ports) {
                let d = new Device(p.path, p.devices);
                devices.push(d);
                arrayPromise.push(d.Connect());
            }

            let results = await Promise.allSettled(arrayPromise);
            results = results.findIndex((x) => x.value != false);

            console.log(results);
            if (results != -1) {
                device = devices[results];
            }

        } catch (err) {
            device = undefined;
            throw err;
        }

        return device != undefined ? true : false;
    }
}