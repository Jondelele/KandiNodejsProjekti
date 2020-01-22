// Miksi sensorin lukemiselle on tämä oma filunsa? Eikö lukemisen
// voisi tehdä myös filussa routers/sensor.js? Vai halutaanko tässä pitää
// sensorin lukeminen ja siihen liittyvä reitittäminen erillään? Kyllä halutaan
const i2c = require('i2c-bus');
 
const TCN75A_ADDR = 0x48;
const TEMP_REG = 0x00;
const CONF_REG = 0x01;

// var i2c1 = i2c.open(1, () => {
   
//    // Configure max resolution:
//    var write_buffer = Buffer.from([CONF_REG, 0x60]);
//    i2c1.i2cWriteSync(TCN75A_ADDR, 2, write_buffer);
   
//    // Set pointer back to temp register:
//    var read_select_buffer = Buffer.from([0x00]);
//    i2c1.i2cWriteSync(TCN75A_ADDR, 1, read_select_buffer);
    
//     // Loop till the end of times:
//     setInterval(function(){
        
//         ReadTemp(i2c1);
        
//     }, 1000);
    
// });

function ReadTemp(i2c1) {
    
    var read_buffer = Buffer.alloc(2);
    i2c1.i2cRead(TCN75A_ADDR, 2, read_buffer, () => {
       
        // console.log("read_buffer:", read_buffer);
        var temp = convert(read_buffer[0], read_buffer[1]);
        
        console.log("Temp:", temp.toFixed(4) + "*C");
    });
}

function convert(a, b){
      
  var temp = 0.0;    
  
  if( a > 125){
  
    a = a - 256;
  }
  temp = a + b/256;
  return temp;
}

// Returns just dummy data for development purposes
// function returnDummyData() {
//     var temp = 8.9; 
//     return temp;
// }

module.exports.returnDummyData = function() {
    // return pool.query(queryStr, queryParams).then((result) => result.rows)
    // var temp = 20.9;
    // return temp;
    // return resolve(temp);

    return new Promise((resolve, reject) => {
        var temp = 20.9;
        // return temp;
        return resolve(temp);
    })
}

// module.exports = {
//     returnDummyData
// }