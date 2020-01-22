// Tanne pystyy järjestykseen laittamaan että missä jarjestyksessa käsitellään
// api kutsuja
// Tiettyyn kohtaan tulee autentikointi jonka alapuolella oleviin api kutsujen
// handlereihin/routtereihin pääsee käsiksi vasta kun on onnistuneesti autentikoitunut
const express = require('express')
const public = require('./public');
const private = require('./private');
const api_authentication = require('./api_authentication');

// Paatason routteri johon ladataan alla kaikki muut routterit, joten
// se on spesiaalissa asemassa muihin nähden
var router = express.Router();
const routerUser = require('./users')
const routerSensor = require('./sensor')

// publicit tähän alle, publiccien järjestyksellä keskenään ei ole mitään merkitystä
// muuta kuin jos sovellus on todella paljon käytetty niin sitten suosituimmat routet
// kannattaa laittaa ylös jotta nodejs ei turhaan plaraa niitä läpi joka kerta
router.use(public)


// authenticate tahan
router.use('/', api_authentication);

// privatet tähän alle, privateiden järjestyksellä keskenään ei ole mitään merkitystä
router.use(private)
router.use('/api/user', routerUser) // Paatason routteriin 'router' ladataan routerUser 
router.use('/api/sensor', routerSensor) // Paatason routteriin 'router' ladataan routerSensor

module.exports = router;