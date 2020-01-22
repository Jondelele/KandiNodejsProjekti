// Hoitaa funktiot jotka lukevat ja kirjoittavat sensori
// dataa kantaan
// Tulee ainakin INSERT ja SELECT
const postgresdriver = require('./postgresdriver');

// CREATE TABLE tempLogI2C(
//   log_id serial PRIMARY KEY,
//   temperature DECIMAL NOT NULL,
//   measure_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// Funktio joka tallentaa sensorin arvon kantaan
module.exports.insertI2CTempData = (temp) => {
    const queryString = `
        INSERT INTO tempLogI2C(temperature)
	    VALUES ($1);
    `;

    const sqlParams = [temp];

    // Kutsutaan moduulin postgresdriver funktiota executequery
    // joka ajaa datan kantaan
    return postgresdriver.executeQuery(queryString, sqlParams).then((res) => {
        console.log(res)
        return res.length > 0 ? res[0] : null;
    })
}