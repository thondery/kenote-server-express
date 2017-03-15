
import validator from 'validator'
import * as CODE from '../../error'
import { userProxy } from '../../proxys'
import * as Tools from '../../common/tools'
import { optionError } from '../../models'
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

export const edit = async (req, res, next) => {
  let { name, accesstoken } = req.body
  let { notebook } = req.params
  let auth = await req.auth(accesstoken)
  if (!notebook || notebook.length !== 24) {
    return res.api(null, CODE.ERROR_NOTEBOOK_MARKUP)
  }
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
    notebook, 
    name,
    user: auth._id
  })
}

export const remove = async (req, res, next) => {
  let { accesstoken } = req.query
  let { notebook } = req.params
  let auth = await req.auth(accesstoken)
  if (!_.isArray(notebook)) {
    notebook = [notebook]
  }
  return next({
    notebook,
    user: auth._id
  })
}