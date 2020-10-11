// read-tcn75a.js file reads the sensor data

const i2c = require('i2c-bus');

const TCN75A_ADDR = 0x48;
const TEMP_REG = 0x00;
const CONF_REG = 0x01;

// Reads the temperature from the sensor
module.exports.ReadTemp = function (i2c1) {

    return new Promise((resolve, reject) => {
        var read_buffer = Buffer.alloc(2);
        let temp = 0.0;

        i2c1.i2cRead(TCN75A_ADDR, 2, read_buffer, () => {

            // console.log("read_buffer:", read_buffer);
            temp = convert(read_buffer[0], read_buffer[1]);
            console.log("Temp:", temp.toFixed(4) + "*C");
            return resolve(temp);
        });
    })
}

// Converts temperature to correct format
function convert(a, b) {
    var temp = 0.0;

    if (a > 125) {

        a = a - 256;
    }
    temp = a + b / 256;
    return temp;
}

// Returns dummy sensor data for development purposes
module.exports.returnDummyData = function () {

    return new Promise((resolve, reject) => {
        var temp = 30.2;
        return resolve(temp);
    })
}


