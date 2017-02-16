
import { userProxy } from '../../proxys'
import { optionError } from '../../models'
import * as Tools from '../../common/tools'

export const register = (data, req, res, next) => {
  userProxy.register(data)
    .then( doc => {
      return res.api(doc)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}

export const login = (data, req, res, next) => {
  userProxy.login(data)
    .then( doc => {
      return res.api(doc)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}