const apiRouter = require('./routers/api')

const express = require('express')
const app = express()
const port = 3000

// Express käy läpi järjestyksessä että mikä urli matchaa ja sitten
// pudottaa "/api" kohdan pois ja etsii apiRouterin
app.use('/api', apiRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))