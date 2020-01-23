// Tekee CRON hommaa eli tallentaa sensorin dataa kantaan tietyin väliajoin
// Yhdistää db_sensor.js ja read-tcn75a.js filuihin
// Funktio joka stoppaa lokituksen ja omansa myös lokituksen aloittamiselle
const readTcn75a = require('../modules/read-tcn75a')
const db_sensor = require('../database/db_sensor')



module.exports.startLoggin = () => {

    readTcn75a.returnDummyData().then((temperature) => {
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
