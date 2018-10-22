const R = require('ramda')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const { findUser, findById } = require('../model/user')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
  findUser(username)
    .then(user => {
      if (user) {
        return bcrypt.compare(password, user.password)
          .then(isPasswordCorrect => {
            if (isPasswordCorrect) done(null, R.omit(['password'], user))
            else done(null, false)
          })
      } else done(null, false)
    })
    .catch(err => done(err) )
}));

passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserialize');
  findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
});
