import * as constant from './constant'

export const ERROR_USERNAME_REQUIRED     = 1101
export const ERROR_USERNAME_MINSIZE      = 1102
export const ERROR_USERNAME_MAXSIZE      = 1103
export const ERROR_USERNAME_FORMAT       = 1104
export const ERROR_USERNAME_UNIQUE       = 1105

export const ERROR_EMAIL_REQUIRED        = 1111
export const ERROR_EMAIL_FORMAT          = 1112
export const ERROR_EMAIL_UNIQUE          = 1113

export default [

  { code: ERROR_USERNAME_REQUIRED,     message: constant.ERROR_USERNAME_REQUIRED },
  { code: ERROR_USERNAME_MINSIZE,      message: constant.ERROR_USERNAME_MINSIZE },
  { code: ERROR_USERNAME_MAXSIZE,      message: constant.ERROR_USERNAME_MAXSIZE },
  { code: ERROR_USERNAME_FORMAT,       message: constant.ERROR_USERNAME_FORMAT },
  { code: ERROR_USERNAME_UNIQUE,       message: constant.ERROR_USERNAME_UNIQUE },

  { code: ERROR_EMAIL_REQUIRED,        message: constant.ERROR_EMAIL_REQUIRED },
  { code: ERROR_EMAIL_FORMAT,          message: constant.ERROR_EMAIL_FORMAT },
  { code: ERROR_EMAIL_UNIQUE,          message: constant.ERROR_EMAIL_UNIQUE },
]