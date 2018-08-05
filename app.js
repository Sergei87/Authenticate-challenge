const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const User = require('./model/user')
const R = require('ramda')
const pgSessionStore = require('connect-pg-simple')(session)
const saltRounds = 10;

const app =  express()

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done){
  User.findUser(username)
    .then(user => {
      if (user) return bcrypt.compare(password, user.password)
        .then(isPasswordCorrect => {
          if (isPasswordCorrect) return done(null, user)
          else done(null, false, { message: 'Incorrect password.' })
        })
      else return done(null, false, { message: 'Incorrect username.' })
    })
    .catch(err => done(err))
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  store: new pgSessionStore({
    conString: `postgres://postgres:postgres@localhost:5432/postgres`,
    tableName: 'user_session'
  }),
  secret: 'Exch4ng3',
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', (req, res, next) => {
  User.findUser(req.body.username)
    .then(user => {
      if (user) {
        res.send("User with this name already exist")
        return Promise.reject('User exist')
      }
      return bcrypt.hash(req.body.password, saltRounds)
    })
    .then(hash =>
      User.createUser({username: req.body.username, password: hash})
    )
    .then((user) => {
      req.logIn(user, function(err) {
        return err ? next(err) : res.redirect('/private');
      })
    })
    .catch(err => {console.log('Rigister error', err); next(err)})
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (user) {
      req.logIn(user, function(err) {
        return err ? next(err) : res.redirect('/private');
      })
    }
    else res.redirect('/')

  })(req, res, next)
})

app.post('/subordinates', (req, res, next) => {
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
