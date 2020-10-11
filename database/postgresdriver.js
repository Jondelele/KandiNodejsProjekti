const config = require('../config')

const { Pool, Client } = require('pg')

// Short insturctions how to set up the Postgres database for this program on Linux:
// https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e
// username@machineName:~ $ sudo -u postgres createuser node
// username@machineName:~ $ sudo -u postgres createdb nodekandi
// username@machineName:~ $ sudo -u postgres psql
// postgres=# alter user node with encrypted password 'password1234';
// postgres=# grant all privileges on database nodekandi to node ;
// postgres=# ALTER USER node WITH SUPERUSER;
// postgres=# \connect nodekandi
// nodekandi=#
// SQL query for creating the simple database table for the temperature entries, this can be used when setting
// up the program to new environment:
// CREATE TABLE tempLogI2C(
//   log_id serial PRIMARY KEY,
//   temperature DECIMAL NOT NULL,
//   measure_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

const pool = new Pool({
  connectionString: config.connectionString,
})

// Executes the query against the database
module.exports.executeQuery = function(queryStr, queryParams) {
  return pool.query(queryStr, queryParams).then((result) => result.rows)
}
