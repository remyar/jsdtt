const ELM = require('../../protocoles/elm');

let protocole = undefined;

let _elm_serial_speed = [38400, 57600, 115200, 230400, 500000, 1000000, 2000000];
let error_timeout = 0;
let error_question = 0;
let error_bufferfull = 0;
let error_nodata = 0;
let error_rx = 0;
let error_can = 0;

module.exports = {
    async Connect(port) {
        try {
            error_timeout = 0;
            error_question = 0;
            error_bufferfull = 0;
            error_nodata = 0;
            error_rx = 0;
            error_can = 0;

            protocole = undefined;

            for (let speed of _elm_serial_speed) {

                console.log("Trying to open port " + port + "@" + speed);

                let _protocole = new ELM(port, speed);

                if (await _protocole.Connect()) {

                    let response = await _protocole.send_raw("ATZ");

                    if (response.includes("?")) {
                        error_question += 1;
                        response = await _protocole.send_raw("ATZ");
                    }

                    if (response.includes("TIMEOUT")) {
                        error_timeout += 1;
                    }

                    if (response.includes("BUFFER FULL")) {
                        error_bufferfull += 1;
                    }
                    if (response.includes("NO DATA")) {
                        error_nodata += 1;
                    }
                    if (response.includes("RX ERROR")) {
                        error_rx += 1;
                    }
                    if (response.includes("CAN ERROR")) {
                        error_can += 1;
                    }

                    if (response.includes("ELM") || response.includes("OBDII")) {
                        protocole = _protocole;
                        break;
                    }
                }

                await _protocole.Disconnect();
            }

            return protocole == undefined ? false : true;

        } catch (err) {
            return false;
        }
    }
}