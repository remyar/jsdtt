const _serial = require('./serial');

const support = [
    _serial
]

module.exports = {
    getList: () => {
        return support;
    }
}