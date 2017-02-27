
import validator from 'validator'
import * as CODE from '../../error'
import { userProxy } from '../../proxys'
import * as Tools from '../../common/tools'
import { optionError } from '../../models'

const validData = {
  ['name']: {
    max: 20,
    pattern: name => validator.matches(name, /^[0-9a-zA-Z\u4e00-\u9fa5\-\_]+$/)
  }
}

export const create = async (req, res, next) => {
  let { name, accesstoken } = req.body
  try {
    let user = await userProxy.accessToken(accesstoken)
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
      user: user._id
    })
  } catch (err) {
    if (optionError(err)) {
      return res.api(null, err.code)
    }
    else {
      return next(err)
    }
  }
}