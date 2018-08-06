const R = require('ramda')

const initEnvVariable = (_default,k)=>
  process.env[k] = R.defaultTo(_default, process.env[k])

R.mapObjIndexed(initEnvVariable, {
  db_host: "localhost",
  db_port: 5234,
  db_name: 'postgres',
  db_username: 'postgres',
  db_password: 'postgers'
})
