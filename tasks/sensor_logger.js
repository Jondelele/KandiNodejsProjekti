// Tekee CRON hommaa eli tallentaa sensorin dataa kantaan tietyin väliajoin
// Yhdistää db_sensor.js ja read-tcn75a.js filuihin
// Funktio joka stoppaa lokituksen ja omansa myös lokituksen aloittamiselle
const readTcn75a = require('../modules/read-tcn75a')
const db_sensor = require('../database/db_sensor')
const i2c = require('i2c-bus');
var i2c1;

module.exports.openI2cConnection = () => {
    // -----------------------------------------------------------------------
    const TCN75A_ADDR = 0x48;
    const TEMP_REG = 0x00;
    const CONF_REG = 0x01;

    i2c1 = i2c.open(1, () => {
    
    // Configure max resolution:
    var write_buffer = Buffer.from([CONF_REG, 0x60]);
    i2c1.i2cWriteSync(TCN75A_ADDR, 2, write_buffer);
    
    // Set pointer back to temp register:
    var read_select_buffer = Buffer.from([0x00]);
    i2c1.i2cWriteSync(TCN75A_ADDR, 1, read_select_buffer);
        
        // Loop till the end of times:
        // setInterval(function(){
            
        //     ReadTemp(i2c1);
            
        // }, 1000);
        
    });
    // -----------------------------------------------------------------------
}

module.exports.startLoggin = () => {
    
    readTcn75a.ReadTemp(i2c1).then((temperature) => {
        console.log(temperature)

        db_sensor.insertI2CTempData(temperature).then((success) => {
            console.log(success)
            if(success) {
                console.log('Temp data db insertion failed!')
            } else {
                console.log('Temp data tallennettu!')
            }
        })

    }).catch((error) => {
        console.log("Query failed!")
        console.log(error)
    })

}
