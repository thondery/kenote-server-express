
import _ from 'lodash'
import errorTables, * as CODE from '../error'

const ran_len = 8
const ran_str = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789;-_[]{}()~!@#$%^&*+=\\?/.,:\'"|`'

export const random = (...opts) => {
  let arg = _.zipObject(['len', 'char'], opts)
  let str_num = typeof arg['len'] === 'number' ? arg['len'] : ran_len
  str_num = typeof arg['len'] === 'object' ? _.random(arg['len'][0], arg['len'][1]) : str_num
  let chars = typeof arg['len'] === 'string' ? arg['len'] : ran_str
  chars = typeof arg['char'] === 'string' && typeof arg['len'] !== 'string' ? arg['char'] : chars
  let str_arr = chars.split("")
  let r_num = str_arr.length
  let str = ''
  for (let i = 0; i < str_num; i++) {
    let pos = Math.floor(Math.random() * r_num)
    str += chars[pos]
  }
  return str
}

export const errInfo = code =>  _.find(errorTables, { code: code })

export const Error = code => {
  let info = _.find(errorTables, { code: code })
  if (!info) return
  let err = new Error()
  err.code = info.code
  err.message = info.messgae
  return err
}

export const res_api = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  res.api = (data, code = CODE.ERROR_STATUS_NULL) => {
    let status = errInfo(code) || null
    return res.json({ data, status })
  }
  return next()
}

export const getStringByte = (str) => {
  var char = str.replace(/[^\x00-\xff]/g, '**')
  return char.length
}