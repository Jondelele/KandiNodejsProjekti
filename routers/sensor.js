// sensor.js router handles the sensor related requests

const express = require('express')
const db_sensor = require('../database/db_sensor')

var router = express.Router()

// Route which sends back ten last temperature measurements
router.get('/tenlasttemps', async function(req, res) {
    try {
        var result = await db_sensor.selectTenLastI2CTempData()
        console.log(result)
        return res.json(result)

    } catch (error) {
        console.log("Query failed!")
        console.log(error)
    }
});

module.exports = router;
