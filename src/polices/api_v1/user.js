
import validator from 'validator'
import * as CODE from '../../error'

const validData = {
  ['email']: { 
    pattern: email => validator.isEmail(email)
  },
  ['password']: {
    min: 6,
    max: 24,
    pattern: password => validator.matches(password, /^[a-z0-9_-]+$/)
  }
}

export const register = (req, res, next) => {
  let { username, password } = req.body
  let data = {
    username,
    password
  }
  if (!username) {
    return res.api(null, CODE.ERROR_EMAIL_REQUIRED)
  }
  let validDataByUsername = validData['email']
  if (!validDataByUsername.pattern(username)) {
    return res.api(null, CODE.ERROR_EMAIL_FORMAT)
  }
  if (!password) {
    return res.api(null, CODE.ERROR_PASSWORD_REQUIRED)
  }
  let validDataByPassword = validData['password']
  if (validDataByPassword.min > password.length) {
    return res.api(null, CODE.ERROR_PASSWORD_MINSIZE)
  }
  if (validDataByPassword.max < password.length) {
    return res.api(null, CODE.ERROR_PASSWORD_MAXSIZE)
  }
  if (!validDataByPassword.pattern(password)) {
    return res.api(null, CODE.ERROR_PASSWORD_FORMAT)
  }
  return next(data)
}

export const login = (req, res, next) => {
  let { username, password } = req.body
  let data = {
    username,
    password
  }
  if (!username) {
    return res.api(null, CODE.ERROR_LOGINNAME_REQUIRED)
  }
  if (!password) {
    return res.api(null, CODE.ERROR_LOGINPASS_REQUIRED)
  }
  return next(data)
}

export const accessToken = (req, res, next) => {
  let { accesstoken } = req.body
  let data = {
    accesstoken
  }
  if (!validator.isUUID(accesstoken, 4)) {
    return res.api(null, CODE.ERROR_ACCESSTOKEN_NULL)
  }
  return next(data)
}

export const syncDataRequest = async (req, res, next) => {
  let { accesstoken, lastUpdateCount, lastSyncTime } = req.body
  let auth = await req.auth(accesstoken)
  return next({
    user: auth._id,
    lastUpdateCount: lastUpdateCount || 0, 
    lastSyncTime: lastSyncTime || 0
  })
}

export const syncDataSend = async (req, res, next) => {
  let { accesstoken, payload } = req.body
  let auth = await req.auth(accesstoken)
  return next({
    user: auth._id,
    payload
  })
}

export const syncDataByGet = async (req, res, next) => {
  let { accesstoken } = req.query
  let auth = await req.auth(accesstoken)
  return next({
    user: auth._id
  })
}

export const syncDataByPost = async (req, res, next) => {
  let { accesstoken, payload } = req.body
  let auth = await req.auth(accesstoken)
  console.log(payload)
  return res.api(payload)
  /*
  return next({
    user: auth._id,
    payload
  })*/
}