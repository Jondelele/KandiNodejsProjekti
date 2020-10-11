// app.js file runs the application

const apiRouter = require('./routers/api')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 3000

var CronJob = require('cron').CronJob;
const sensor_logger = require('./tasks/sensor_logger')

sensor_logger.openI2cConnection()

new CronJob('* * * * * *', function() {
    sensor_logger.startLoggin()
}, null, true, 'Europe/Helsinki');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.use('/', apiRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
