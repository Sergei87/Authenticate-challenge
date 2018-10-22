require('./env')
require('./config/passport')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const bcrypt = require('bcrypt');
const { findUser, createUser, } = require('./model/user')
const R = require('ramda')
const { connectionParams } = require('./db')
const pgSessionStore = require('connect-pg-simple')(session)
const saltRounds = 10;

const app = express()

app.use(express.static('front/dist/front'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  store: new pgSessionStore({
    conObject: connectionParams,
    tableName: 'user_session',
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  }),
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', (req, res, next) => {
  console.log(req.body);
  return findUser(req.body.username)
    .then(user => {
      if (user) {
        res.status(401).end("User with this name already exist")
        return Promise.reject('User exist')
      }
      return bcrypt.hash(req.body.password, saltRounds)
    })
    .then(hash =>
      createUser({username: req.body.username, password: hash})
    )
    .then((user) => {
      req.logIn(user, function(err) {
        return err ? res.status(401) : res.status(201).send(user);
      })
    })
    .catch(err => {console.log('Rigister error', err); res.sendStatus(401)})
})

app.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (user) {
      req.logIn(user, function(err) {
        return err ? next(err) : res.status(200).send(user);
      })
    }
    else next(err)//res.status(401).send({message: 'Authentication failed. Wrong password'})
  })(req, res, next)
})

app.post('/subordinates', (req, res, next) => {
  console.log(req.body);
  if (!req.user) return res.redirect('/')
  if (req.user.role === 'admin') {
    return User.getAll()
      .then(users => res.json(users))
      .catch(err => res.status(404))
  }
  if (req.user.role === 'boss') {
    if (!req.user.subordinates) req.user.subordinates = []
    req.user.subordinates.push(req.user.id)
    return User.getByIds(req.user.subordinates)
      .then(users => res.json(users))
      .catch(err => res.status(404))
  }
  return res.json(R.omit(['password'], req.user))
})

app.post('/change/role', (req, res) => {
  if (!req.user) return res.redirect('/')
  if (req.user.role === 'boss') {
    User.changeUserRoles(req.body.userId)
      .then(user => res.status(200).end('User role changed'))
      .catch(err => res.status(404))
  }
  else res.send("You didn't have rights to change role").end()
})

app.listen(8000, () => {
  console.info('Server start on port 8000')
})

module.exports = app;
