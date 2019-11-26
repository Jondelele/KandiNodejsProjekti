// Tanne pystyy järjestykseen laittamaan että missä jarjestyksessa käsitellään
// api kutsuja
// Tiettyyn kohtaan tulee autentikointi jonka alapuolella oleviin api kutsujen handlereihin
// pääsee käsiksi vasta kun on onnistuneesti autentikoitunut
const express = require('express')
// Paatason routteri johon ladataan alla kaikki muut routterit, joten
// se on spesiaalissa asemassa muihin nähden
var router = express.Router();
const routerUser = require('./users')

// publicit täällä

// authenticate tahan
router.use('/user', routerUser)

// privatet täällä



module.exports = router;