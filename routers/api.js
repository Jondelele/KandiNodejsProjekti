// Tanne pystyy järjestykseen laittamaan että missä jarjestyksessa käsitellään
// api kutsuja
// Tiettyyn kohtaan tulee autentikointi jonka alapuolella oleviin api kutsujen
// handlereihin/routtereihin pääsee käsiksi vasta kun on onnistuneesti autentikoitunut
const express = require('express')

// Paatason routteri johon ladataan alla kaikki muut routterit, joten
// se on spesiaalissa asemassa muihin nähden
var router = express.Router();
const routerUser = require('./users')

// publicit tähän alle

// authenticate tahan

// privatet tähän alle
router.use('/user', routerUser) // Paatason routteriin 'routter' ladataan routerUser 


module.exports = router;