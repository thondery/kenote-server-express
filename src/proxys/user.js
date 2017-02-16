import Promise from 'bluebird'
import { userDao, uniqueError } from '../models'
import crypto from 'crypto'
import uuid from 'node-uuid'
import _ from 'lodash'
import * as Tools from '../common/tools'
import * as CODE from '../error'

const salt_len = 12  // 加密盐字节长度
const initialData = {
  username        : undefined,
  password        : undefined,
  email           : undefined,
  salt            : undefined,
  nickname        : undefined
}

const uniqueCode = {
  ['$username_1']  : CODE.ERROR_USERNAME_UNIQUE,
  ['$email_1']     : CODE.ERROR_EMAIL_UNIQUE
}

// 创建账号
export const create = info => {
  return new Promise( (resolve, reject) => {
    userDao.create(info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 查询单个用户
export const findOne = info => {
  return new Promise( (resolve, reject) => {
    userDao.one(info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 删除所有数据
export const removeAll = () => {
  return new Promise( (resolve, reject) => {
    userDao.deleteAll( err => {
      if (err) {
        reject(err)
      }
      else {
        resolve(null)
      }
    })
  })
}

// 注册用户
export const register = info => {
  return create(getData(info))
    .then( doc => _.pick(doc, ['_id', 'username', 'email', 'accesskey', 'create_at', 'update_at']))
    .catch( uniqueError, err => {
      let tag = err.errmsg.match(/(\$)([a-zA-Z0-9\_]+)(\_1)/g) || ['']
      let _uniqueCode = uniqueCode[tag[0] === '$username_1' ? '$email_1' : tag[0]]
      let e = new Error(Tools.errInfo(_uniqueCode).message)
      e.code = _uniqueCode
      throw e
    })
}

// 用户登录
export const login = info => {
  let { username, password } = info
  return findOne({
      '$or': [{ 'username': username } , { 'email': username }]
    })
    .then( doc => {
      let e = new Error(Tools.errInfo(CODE.ERROR_LOGINVALID_FAIL).message)
      e.code = CODE.ERROR_LOGINVALID_FAIL
      if (!doc) throw e
      let valide = validPassword(password, doc.salt, doc.password)
      if (!valide) throw e
      return doc
    })
    .then( doc => _.pick(doc, ['_id', 'username', 'email', 'accesskey', 'create_at', 'update_at']))
}

// 加密密码
export const encryptPwd = password => {
  let _salt = salt()
  let encrypt = getEncryptPwd(password, _salt)
  return { _salt, encrypt }
}

// 校验密码
export const validPassword = (password, _salt, encrypt) => 
  encrypt === getEncryptPwd(password, _salt)


// 生产加密盐
const salt = () => Tools.random(salt_len)

// 依据加密盐进行加密
const getEncryptPwd = (password, _salt) => {
  let _password = crypto.createHash('md5').update(password).digest('hex')
  return crypto.createHash('sha1').update(`${_password}^${_salt}`).digest('hex')
}

// 转换提交数据
const getData = info => {
  let { _salt, encrypt } = encryptPwd(info.password)
  return {
    ...initialData,
    username        : info.username,
    email           : info.username,
    password        : encrypt,
    salt            : _salt,
    accesskey       : uuid.v4()
  }
}