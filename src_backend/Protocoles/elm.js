const Serial = require('../Supports/serial')
const MessageBuffer = require('./MessageBuffers');

class ELM {

    constructor(port, baurate) {
        this.port = port;
        this.baudrate = baurate;
        this.serial = new Serial({ path: this.port, baudrate: this.baudrate });

        this.waitingFrame = new MessageBuffer(['>']);

        this.ListAnswerMessages = undefined;
    }

    async send_raw(command) {
        return new Promise(async (resolve, reject) => {
            try {
                this.ListAnswerMessages = undefined;
                await this.serial.write(command + "\r");

                let _interval = undefined;
                let _timeout = undefined;
                _interval = setInterval(()=>{
                    if (this.ListAnswerMessages != undefined){
                        clearInterval(_interval);
                        clearTimeout(_timeout);
                        console.log(this.port + " => read : " + this.ListAnswerMessages);
                        resolve(this.ListAnswerMessages);
                    }
                },1);

                _timeout = setTimeout(() => {
                    clearInterval(_interval);
                    clearTimeout(_timeout);
                    console.log(this.port + " => read : " + "TIMEOUT");
                    resolve("TIMEOUT");
                }, 1000);

            } catch (err) {
                reject(err);
            }

        });
    }

    async Connect() {
        return new Promise(async (resolve, reject) => {

            try {
                await this.serial.open();
                this.serial.onData((data, params) => {
                    data.forEach((e) => this.waitingFrame.push([String.fromCharCode(e)]));

                    while (!this.waitingFrame.isFinished()) {
                        let message = this.waitingFrame.handleData().join("");
                        this.ListAnswerMessages = message;
                    }
                });

                resolve(true);
            }
            catch (err) {
                console.log(this.port + " => " + err);
                reject(false);
            }
        })
    }




    async Disconnect() {
        return new Promise(async (resolve) => {
            await this.serial.close();
            resolve();
        });
    }
}

module.exports = ELM;