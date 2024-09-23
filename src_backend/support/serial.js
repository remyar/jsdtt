const { SerialPort } = require('serialport');
const MessageBuffer = require('./MessageBuffer');

let _msgBuffer = new MessageBuffer(">");

class Serial {
    constructor(params) {

        this.buffer = [];
        // this.onDatasCallback = () => { };

        this.port = new SerialPort({ path: params.path, autoOpen: params.autoOpen || false, baudRate: params.baudrate });

        // The open event is always emitted
        this.port.on('open', function () {
            // open logic
        });

        this.port.on('data', (data) => {
            _msgBuffer.push(data)
         //   this.buffer = [...this.buffer, ...data];
            // this.onDatasCallback && this.onDatasCallback(data, this.port.path);
        });
    }

    async open() {
        return new Promise((resolve, reject) => {
            this.port.open(function (err) {
                if (err) {
                    reject('Error opening port: ', err.message);
                    return;
                }
                resolve(this.port);
            });
        });
    }

    async close() {
        return new Promise((resolve) => {
            this.onDatasCallback = undefined;

            if (this.port.isOpen) {
                this.port.on('close', function () {
                    resolve();
                });

                this.port && this.port.close();
            } else {
                resolve();
            }
        });
    }

    async expect(str , timeout = 1000) {
        return new Promise((resolve , reject)=>{
            let _timeout = undefined;
            let _interval = undefined;
            _interval = setInterval(() => {
                if ( _msgBuffer.isFinished() == false ){
                    let bu = _msgBuffer.getMessage();
                    bu = bu.map(e => String.fromCharCode(e)).join("").toString();
                    clearInterval(_interval);
                    clearTimeout(_timeout);
                    resolve(bu);
                }
            }, 1);

             _timeout = setTimeout(() => {
                if (_interval) {
                    clearInterval(_interval);
                }
                if (_timeout) {
                    clearTimeout(_timeout);
                }
                resolve("TIMEOUT");
            }, timeout);
        })
    }

    async write(str) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.port) {
                    if (this.port.isOpen) {
                        this.port.write(str);
                        this.port.drain((err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    } else {
                        reject();
                    }

                } else {
                    reject();
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}



module.exports = Serial;