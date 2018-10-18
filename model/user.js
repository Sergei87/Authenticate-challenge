const { db } = require('../db')
const R = require('ramda')



const createUser  = user =>
  db.one('INSERT INTO "users" (username, password, role) \
    VALUES  (${username}, ${password}, \'user\') RETURNING *' , user)
    .catch(err => console.error('createUser', err))

const findUser = (username) =>
  db.query('SELECT * FROM "users" WHERE username = ${username}', {username})
    .then(R.head)

const findById = (id) =>
  db.one('SELECT * FROM "users" WHERE id = ${id}', {id})

const changeUserRoles = (id=14) =>
  db.query('UPDATE "users" SET role=\'boss\' WHERE id = ${id} RETURNING *', {id})

const getAll = () =>
  db.query('SELECT id, username, role, subordinates FROM "users"')

const getByIds = ids =>
  db.query('SELECT id, username, role, subordinates FROM "users" WHERE id = ANY(${ids})', {ids})

module.exports = {
  createUser,
  findUser,
  findById,
  changeUserRoles,
  getAll,
  getByIds,
}
