require('./env')
const R = require('ramda')
const pgp = require('pg-promise')();

const connectionParams = {
  host: process.env.db_host,
  port: process.env.db_port,
  database: process.env.db_name,
  user: process.env.db_username,
  password: process.env.db_password
}
const db = pgp(connectionParams)

module.exports = {
  db, connectionParams
}
