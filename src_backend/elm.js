const Serial = require('./support/serial');

class ELM {
    constructor(portName, rate, adapter_type = "STD", maxspeed = "No") {
        this.portName = portName;
        this.rate = rate;
        this.adapter_type = adapter_type;
        this.maxspeed = maxspeed;

        this.port = undefined;
        this.connectionStatus = false;
        this.lastCMDtime = 0;
        this.portTimeout = 1000;

        this.error_timeout = 0;
        this.error_question = 0;
        this.error_bufferfull = 0;
        this.error_nodata = 0;
        this.error_rx = 0;
        this.error_can = 0;

        this.ATCFC0 = false;

        this.buff = [];
    }

    async send_raw(command, expect = '>') {
        return new Promise(async (resolve, reject) => {
            try {
                let tb = new Date().getTime();

                // save command to log

                // send command
                await this.port.write(command + "\r");

                let response = await this.port.expect(expect, this.portTimeout);
                if (response.includes("TIMEOUT")) {
                    this.error_timeout += 1;
                }
                if (response.includes("?")) {
                    this.error_question += 1;
                }
                if (response.includes("BUFFER FULL")) {
                    this.error_bufferfull += 1;
                }
                if (response.includes("NO DATA")) {
                    this.error_nodata += 1;
                }
                if (response.includes("RX ERROR")) {
                    this.error_rx += 1;
                }
                if (response.includes("CAN ERROR")) {
                    this.error_can += 1;
                }

                //-- save response to log
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

    async __init__() {
        console.log("Trying to open port " + this.portName + "@" + this.rate);
        try {
            this.port = new Serial({ path: this.portName, baudrate: this.rate });
            await this.port.open();

            this.lastCMDtime = 0;

            // Purge unread data

            this.port.expect(">");
            let res = await this.send_raw("ATZ");

            if (res.includes("ELM") || res.includes("OBDII")) {
                this.connectionStatus = true;
            }

            if ((this.adapter_type == "OBDLINK") && (this.maxspeed > 0) && (this.rate != 2000000)) {
                console.log("OBDLink Connection OK, attempting full speed UART switch");
            } else if ((this.adapter_type == "STD_USB") && (this.rate != 115200) && (this.maxspeed > 0)){
                console.log("ELM Connection OK, attempting high speed UART switch");
            }

            return;
        } catch (err) {
            this.connectionStatus = false;
            throw Error(err);
        }
    }
}

module.exports = ELM;