// users.js file handles the user related requests

const express = require('express')
const postgresdriver = require('../database/postgresdriver')

var router = express.Router();

// Test route for handling user related queries
router.get('/', async function(req, res) {
    // try {
    //     var result = await postgresdriver.executeQuery(`SELECT * FROM horses;`)
    //     console.log(result)
    //     return res.json(result)
    // } catch (error) {
    //     console.log("Query ei onnistunut!")
    //     console.log(error)
    // }
});

module.exports = router;
