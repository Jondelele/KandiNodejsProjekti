const config = require('../config')

const { Pool, Client } = require('pg')
// Hyvät ohjeet siihen miten PostgreSQL database laitetaan pystyyn:
// https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e
// prehtij@JP-HP-Envy:~ $ sudo -u postgres createuser node
// prehtij@JP-HP-Envy:~ $ sudo -u postgres createdb nodekandi
// prehtij@JP-HP-Envy:~ $ sudo -u postgres psql
// postgres=# alter user node with encrypted password 'Kollikissa3';
// postgres=# grant all privileges on database nodekandi to node ;
// Ja ennen kuin oikeudet oikeasti tulevat voimaan niin node rolesta tulee
// tehdä superuser seuraavalla komennolla:
// postgres=# ALTER USER node WITH SUPERUSER;

const pool = new Pool({
  connectionString: config.connectionString,
})

// Functio 'executeQuery' lopullisesti hoitaa queryn suorittamisen, tätä voidaan kutsua
// kaikkialla jossa pitää queryja suorittaa, kuten vaikka users.js filussa
module.exports.executeQuery = function(queryStr, queryParams) {
  return pool.query(queryStr, queryParams).then((result) => result.rows)
}