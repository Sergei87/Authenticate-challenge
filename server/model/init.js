const { db } = require('../db')

const createUserTable = () =>
  db.query('CREATE TABLE public.users( \
    id serial PRIMARY KEY, \
    username text, \
    password character varying(256), \
    role text, \
    subordinates integer[])')

const createUserSessionTable = () =>
  db.query('CREATE TABLE public.user_session ( \
    sid character varying NOT NULL, \
    sess json NOT NULL, \
    expire timestamp(6) without time zone NOT NULL, \
    CONSTRAINT user_session_pkey PRIMARY KEY (sid))')


createUserTable()
createUserSessionTable()
