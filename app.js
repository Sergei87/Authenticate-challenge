const { db } = require('./db')

db.query('SELECT * FROM session_all')
  .then(d => console.log)
  .catch(console.error)
