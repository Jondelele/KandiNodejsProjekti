// Käyttäjään liittyvät operaatiot
const express = require('express')
var router = express.Router();

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('user router!');  
});

module.exports = router;
