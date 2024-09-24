const fs = require('fs');
const path = require("path");
const StreamZip = require('node-stream-zip');

const zip = new StreamZip.async({ file: path.resolve(__dirname, "ecu.zip") });

module.exports = {
    init: async () => {
        
    }
}