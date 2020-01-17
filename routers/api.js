// Tanne pystyy järjestykseen laittamaan että missä jarjestyksessa käsitellään
// api kutsuja
// Tiettyyn kohtaan tulee autentikointi jonka alapuolella oleviin api kutsujen
// handlereihin/routtereihin pääsee käsiksi vasta kun on onnistuneesti autentikoitunut
const express = require('express')
const public = require('./public');
const api_authentication = require('./authentication');

// Paatason routteri johon ladataan alla kaikki muut routterit, joten
// se on spesiaalissa asemassa muihin nähden
var router = express.Router();
const routerUser = require('./users')

// publicit tähän alle
router.use(public)

// authenticate tahan
router.use(api_authentication);

// privatet tähän alle
router.use('/user', routerUser) // Paatason routteriin 'routter' ladataan routerUser 


module.exports = router;