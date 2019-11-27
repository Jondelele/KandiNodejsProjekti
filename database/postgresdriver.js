
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://node:Kollikissa3@localhost:5433/nodekandi'

const pool = new Pool({
  connectionString: connectionString,
})

module.exports.executeQuery = function(queryStr, queryParams) {
  return pool.query(queryStr, queryParams).then((result) => result.rows)
}