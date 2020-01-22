// Routteri joka hoitaa sensorin käsittelyn
// Tarjoaa metodit anturi datan hakemiseen kannasta
// Yhdistää mielellään vain db_sensor.js filuun
const express = require('express')
const db_sensor = require('../database/db_sensor')

var router = express.Router()

router.get('/tenlasttemps', async function(req, res) {
    try {
        var result = await db_sensor.selectTenLastI2CTempData()
        console.log(result)
        return res.json(result)

    } catch (error) {
        console.log("Query ei onnistunut!")
        console.log(error)
    }
});

module.exports = router;