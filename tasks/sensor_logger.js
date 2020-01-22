// Tekee CRON hommaa eli tallentaa sensorin dataa kantaan tietyin väliajoin
// Yhdistää db_sensor.js ja read-tcn75a.js filuihin
// Funktio joka stoppaa lokituksen ja omansa myös lokituksen aloittamiselle
const readTcn75a = require('../modules/read-tcn75a')
const db_sensor = require('../database/db_sensor')

console.log(readTcn75a.returnDummyData())
console.log(db_sensor.insertI2CTempData(10.1))