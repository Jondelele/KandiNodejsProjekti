// private.js handles the routing of the public static files

const router = require('express').Router();
var express = require('express');
const path = require("path")

router.use('/', express.static(path.join(__dirname, '../public')))

module.exports = router;
