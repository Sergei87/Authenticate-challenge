"use strict"
const chai = require('chai')
const app = require('../app')
const supertest = require('supertest')
const expect = chai.expect
const request = supertest(app)

const credentials = { username: 'olya', password: 'hammer69' }

describe('Auth API:', () => {
  it('should register user', (done) => {
    request.post('/register')
      .send(credentials)
      .expect(201, done)
  })
  it('should return if user exist', (done) => {
    request.post('/register')
      .send(credentials)
      .expect(401, done)
  })
  it('should login user', (done) => {
    request.post('/login')
      .send(credentials)
      .expect(200, done)
  })
})
