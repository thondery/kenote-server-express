
import validator from 'validator'
import * as CODE from '../../error'
import { userProxy } from '../../proxys'
import * as Tools from '../../common/tools'
import { optionError } from '../../models'
import * as Auth from '../../middlewares/auth'
import _ from 'lodash'

const validData = {
  ['name']: {
    max: 20,
    pattern: name => validator.matches(name, /^[0-9a-zA-Z\u4e00-\u9fa5\-\_]+$/)
  }
}

export const create = async (req, res, next) => {
  let { name, accesstoken } = req.body
  let auth = await req.auth(accesstoken)
  if (!name) {
    return res.api(null, CODE.ERROR_NOTEBOOK_REQUIRED)
  }
  if (Tools.getStringByte(name) > validData['name'].max) {
    return res.api(null, CODE.ERROR_NOTEBOOK_MAXSIZE)
  }
  if (!validData['name'].pattern(name)) {
    return res.api(null, CODE.ERROR_NOTEBOOK_FORMAT)
  }
  return next({
    name,
    user: auth._id
  })
}

export const list = async (req, res, next) => {
  let { accesstoken } = req.query
  let auth = await req.auth(accesstoken)
  return next({
    user: auth._id
  })
}