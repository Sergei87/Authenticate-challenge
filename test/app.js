"use strict"
const chai = require('chai')
const app = require('../app')
const supertest = require('supertest')
const expect = chai.expect
const request = supertest(app)
console.log(process.env.NODE_ENV)

const credentials = { username: 'olya', password: 'asdasd' }

describe('Auth API:', () => {
  describe('POST /register', () => {
    it('should register user', (done) => {
      request.post('/register')
        .send(credentials)
        .expect(201)
        .end((err, res) => {
          done(err)
        })
    })
  })
  describe('POST /login', () => {
    it('should login user', (done) => {
      request.post('/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          done(err)
        })
    })
  })
})
