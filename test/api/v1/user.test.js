import 'babel-polyfill'
import app from '../../../src/app'
import supertest from 'supertest'
import should from 'should'
import * as CODE from '../../../src/error'
import { userProxy } from '../../../src/proxys'

const request = supertest(app)

describe('test/api/v1/user.test.js', () => {

  let test_username = 'test@163.com'
  let test_password = '12345678'
  let init_user = {
    username: 'admin@163.com',
    password: '12345678'
  }

  before( done => {
    userProxy.removeAll()
      .then( () => {
        return userProxy.register(init_user)
      })
      .then( doc => {
        done()
      })
  })

  after( done => {
    userProxy.removeAll()
      .then( doc => {
        done()
      })
  })

  describe('POST: /api/v1/register', () => {
    it('should fail with no email', done => {
      request
        .post('/api/v1/register')
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_EMAIL_REQUIRED)
          done()
        })
    })
    it('should fail with email format', done => {
      request
        .post('/api/v1/register')
        .send({
          username: 'admin'
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_EMAIL_FORMAT)
          done()
        })
    })
    it('should fail with email unique', done => {
      request
        .post('/api/v1/register')
        .send({
          username: init_user.username,
          password: test_password
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_EMAIL_UNIQUE)
          done()
        })
    })
    it('should fail with no password', done => {
      request
        .post('/api/v1/register')
        .send({
          username: test_username
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_PASSWORD_REQUIRED)
          done()
        })
    })
    it('should fail with password length is small', done => {
      request
        .post('/api/v1/register')
        .send({
          username: test_username,
          password: '122'
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_PASSWORD_MINSIZE)
          done()
        })
    })
    it('should fail with password length is long', done => {
      request
        .post('/api/v1/register')
        .send({
          username: test_username,
          password: '1234567890abcdefghijklmnopqrstuvwxyz'
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_PASSWORD_MAXSIZE)
          done()
        })
    })
    it('should fail with password format', done => {
      request
        .post('/api/v1/register')
        .send({
          username: test_username,
          password: ';djdjd183920^'
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_PASSWORD_FORMAT)
          done()
        })
    })
    it('should pass', done => {
      request
        .post('/api/v1/register')
        .send({
          username: test_username,
          password: test_password
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_STATUS_NULL)
          done()
        })
    })
  })

  describe('POST: /api/v1/login', () => {
    it('should fail with no loginname', done => {
      request
        .post('/api/v1/login')
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_LOGINNAME_REQUIRED)
          done()
        })
    })
    it('should fail with no loginpass', done => {
      request
        .post('/api/v1/login')
        .send({
          username: 'admin'
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_LOGINPASS_REQUIRED)
          done()
        })
    })
    it('should fail with loginvalid', done => {
      request
        .post('/api/v1/login')
        .send({
          username: 'admin',
          password: 'admin'
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_LOGINVALID_FAIL)
          done()
        })
    })
    it('should pass with loginvalid', done => {
      request
        .post('/api/v1/login')
        .send({
          username: test_username,
          password: test_password
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_STATUS_NULL)
          done()
        })
    })
  })
})

function endApi (err, res) {
  should.not.exists(err)
  res.status.should.equal(200)
  res.body.status.should.be.Object()
  res.body.status.message.should.be.String()
  res.body.status.code.should.be.Number()
  if (res.body.data) {
    res.body.data.should.be.Object()
  }
}