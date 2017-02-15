import Promise from 'bluebird'
import { userDao, uniqueError } from '../models'
import crypto from 'crypto'
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

// 注册用户
export const register = info => {
  return create(info)
    .catch( uniqueError, err => {
      let tag = err.errmsg.match(/(\$)([a-zA-Z0-9\_]+)(\_1)/g) || ['']
      let _uniqueCode = uniqueCode[tag[0]]
      let e = new Error(Tools.errInfo(_uniqueCode).message)
      e.code = _uniqueCode
      throw e
    })
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