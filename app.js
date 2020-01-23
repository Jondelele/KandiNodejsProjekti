// App.js käynnistää nodejs sovelluksen ja ottaa käyttöön api.js filusta
// löytyvän routterin rivillä: 'app.use('/api', apiRouter)'
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


// Express käy läpi järjestyksessä että mikä urli matchaa ja sitten
// pudottaa "/api" kohdan pois ja etsii apiRouterin
// Use ottaa middlewaren käyttöön.
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// Pitaa olla ennen api:a koska muuten ei näy sinne
app.use(cookieParser())
app.use('/', apiRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))