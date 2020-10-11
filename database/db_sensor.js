// db_sensor.js file handles database queries related to the sensor and its data

const postgresdriver = require('./postgresdriver');

// Function that documents the temperature to the database
module.exports.insertI2CTempData = (temp) => {
    const queryString = `
        INSERT INTO tempLogI2C(temperature)
	    VALUES ($1);
    `;

    const sqlParams = [temp];

    // DOcuments the measurement to the database
    return postgresdriver.executeQuery(queryString, sqlParams).then((res) => {
        console.log(res)
        return res.length > 0 ? res[0] : null;
    })
}

// Function that fetches the last 10 temperature measurements from the database
module.exports.selectTenLastI2CTempData = () => {
    const queryString = `
        SELECT *
        FROM templogi2c
        ORDER BY measure_time DESC
        LIMIT 10;
    `

    const sqlParams = []

    return postgresdriver.executeQuery(queryString, sqlParams).then((res) => {
        return res.length > 0 ? res : null
    })
}
