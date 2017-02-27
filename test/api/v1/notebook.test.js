import 'babel-polyfill'
import supertest from 'supertest'
import chai from 'chai'
import uuid from 'node-uuid'
import app from '../../../src/app'
import * as CODE from '../../../src/error'
import { userProxy, notebookProxy } from '../../../src/proxys'

const should = chai.should()
const request = supertest(app)

describe('test/api/v1/notebook.test.js', () => {

  let test_username = 'test@163.com'
  let test_password = '12345678'
  let test_accesstoken = null
  let test_notebook = '我的第一个笔记本'

  before( done => {
    userProxy.removeAll()
      .then( () => {
        return userProxy.register({
          username: test_username,
          password: test_password
        })
      })
      .then( doc => {
        test_accesstoken = doc.accesskey
        return notebookProxy.addNoteBook({
          user: doc._id,
          name: test_notebook
        })
      })
      .then( () => done() )
  })

  after( done => {
    userProxy.removeAll()
      .then( () => {
        return notebookProxy.removeAll()
      })
      .then( () => done() )
  })

  describe('POST: /api/v1/notebook/create', () => {
    it('should fail with no name', done => {
      request
        .post('/api/v1/notebook/create')
        .send({
          accesstoken: test_accesstoken
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_NOTEBOOK_REQUIRED)
          done()
        })
    })
    it('should fail with name format', done => {
      request
        .post('/api/v1/notebook/create')
        .send({
          accesstoken: test_accesstoken,
          name: '!我的第一个笔记本'
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_NOTEBOOK_FORMAT)
          done()
        })
    })
    it('should fail with name unique', done => {
      request
        .post('/api/v1/notebook/create')
        .send({
          accesstoken: test_accesstoken,
          name: test_notebook
        })
        .end( (err, res) => {
          endApi(err, res)
          res.body.status.code.should.equal(CODE.ERROR_NOTEBOOK_UNIQUE)
          done()
        })
    })
    it('should pass', done => {
      request
        .post('/api/v1/notebook/create')
        .send({
          accesstoken: test_accesstoken,
          name: '我的第二个笔记本'
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
  should.not.exist(err)
  should.exist(res)
  res.status.should.equal(200)
  res.body.status.should.be.an('object')
  res.body.status.message.should.be.an('string')
  res.body.status.code.should.be.an('number')
  if (res.body.data) {
    res.body.data.should.be.an('object')
  }
}