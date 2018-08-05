const { db } = require('../db')
const R = require('ramda')

const createUserTable = () =>
  db.query('CREATE TABLE public.users ( \
      username text, \
      password character varying(256), \
      role text, \
      subordinates integer[], \
      id integer NOT NULL DEFAULT nextval(\'users_id_seq\'::regclass), \
      CONSTRAINT users_pkey PRIMARY KEY (id))')

const createUserSessionTable = () =>
  db.query('CREATE TABLE public.user_session ( \
    sid character varying NOT NULL, \
    sess json NOT NULL, \
    expire timestamp(6) without time zone NOT NULL, \
    CONSTRAINT user_session_pkey PRIMARY KEY (sid))')

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
  getByIds
}
