module.exports = class MessageBuffer {
    constructor(delimiter) {
        if (typeof delimiter == "string") {
            delimiter = delimiter.split('').map((e) => e.charCodeAt(0));
        }
        this.delimiter = delimiter;
        this.delimiterIndex = 0;
        this.buffer = []
    }

    isFinished() {
        if ((this.buffer.length === 0)) {
            return true
        }
        if (this.buffer.length < this.delimiter.length) {
            return true;
        }

        let isOk = true;
        let delimiteridx = 0;
        this.delimiterIndex = 0;
        this.buffer.forEach((e, idx) => {
            if (this.delimiterIndex == 0) {
                if (e != this.delimiter[delimiteridx]) {
                    delimiteridx = 0;
                } else if (e == this.delimiter[delimiteridx]) {

                    delimiteridx++;
                    if (delimiteridx >= this.delimiter.length) {
                        if (idx != 0) {
                            this.delimiterIndex = idx;
                            isOk = false;
                        }
                    }
                }
            }
        });
        return isOk;
    }

    push(data) {
        this.buffer = [...this.buffer, ...data];
    }

    getMessage() {
        const delimiterIndex = this.delimiterIndex
        if (delimiterIndex !== -1) {
            const message = this.buffer.slice(0, delimiterIndex + 1);

            this.buffer.splice(0, delimiterIndex + 1);

            return message
        }
        return null
    }

    handleData() {
        /**
         * Try to accumulate the buffer with messages
         *
         * If the server isnt sending delimiters for some reason
         * then nothing will ever come back for these requests
         */
        const message = this.getMessage()
        return message
    }
}

