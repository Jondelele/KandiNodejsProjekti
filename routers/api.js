// api.js file handles routing all requests to the program to the correct handlers

const express = require('express')
const public = require('./public');
const private = require('./private');
const api_authentication = require('./api_authentication');

// This is the top level router where all the other routers are loaded in to
var router = express.Router();

const routerUser = require('./users')
const routerSensor = require('./sensor')

// Public routers that anyone can access even without authentication are listed here
router.use(public)

// Authentication route which guards that non-authenticated requests can't get past this point
router.use('/', api_authentication);

// Private routers that only authenticated users can access are listed here
router.use(private)
router.use('/api/user', routerUser)
router.use('/api/sensor', routerSensor)

module.exports = router;
