// Käyttäjään liittyvät operaatiot
const express = require('express')
const postgresdriver = require('../database/postgresdriver')

var router = express.Router();

// Promise toteutus queryn toteuttamiselle
// router.get('/', function(req, res) {
//     postgresdriver.executeQuery(`SELECT * FROM horses;`).then((result) => {
//         res.json(result)
//     }).catch((error) => {
//         console.log("Query ei onnistunut!")
//     })
// });

// Async/await toteutus queryn toteuttamiselle
router.get('/', async function(req, res) {
    try {
        var result = await postgresdriver.executeQuery(`SELECT * FROM horses;`)
        console.log(result)
        return res.json(result)
    } catch (error) {
        console.log("Query ei onnistunut!")
        console.log(error)
    }
});

module.exports = router;
