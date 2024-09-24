
class Device {
    constructor(SerialPort, filter = undefined){
        this.port = SerialPort;
        this.devices = [];

        if (filter == undefined) {
            this.devices = [
                require('./elm'),
            ];
        } else {
            filter.forEach(element => {
                this.devices.push(require('./' + element));
            });
        }

        this.device = undefined; 
    }

    async Connect() {
        let returnVal = false;

        for (let d of this.devices) {
            if (await d.Connect(this.port)) {
                this.device = d;
                returnVal = this.port;
                break;
            }
        }
        return returnVal;
    }
}

module.exports = Device;