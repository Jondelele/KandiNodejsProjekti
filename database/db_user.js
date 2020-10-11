// db_user.js file handles the user related database queries

const postgresdriver = require('./postgresdriver');

// Function which fetches the user related data from the database
module.exports.getUserAndPassword = (userData) => {
    // Querystring is created and query parameters places are given with syntax ($1, $2, 3$ et cetera)
    // This way the database knows which part of the query is user input and which is not
    // This protects the database from SQL injection!
    const queryString = `
        SELECT user_id, username, password_hash
        FROM public.account
        WHERE username = $1;
    `;

    // SQL parameters are given as JS array
    const sqlParams = [userData.username];

    // Executes the constructed query and returns the value of it, if the query was succesfull
    return postgresdriver.executeQuery(queryString, sqlParams).then((res) => {
        console.log(res)
        return res.length > 0 ? res[0] : null;
    })
}
