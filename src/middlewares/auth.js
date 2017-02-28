import { userProxy } from '../proxys'
import { optionError } from '../models'

export const getAuthByToken = async (req, res, next) => {
  req.auth = async (token) => {
    try {
      return await userProxy.accessToken(token)
    } catch (error) {
      if (optionError(error)) {
        return res.api(null, error.code)
      }
      else {
        return next(error)
      }
    }
  }
  return next()
}