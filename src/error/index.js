import * as constant from './constant'

export const ERROR_STATUS_NULL           = 0

export const ERROR_USERNAME_REQUIRED     = 1101
export const ERROR_USERNAME_MINSIZE      = 1102
export const ERROR_USERNAME_MAXSIZE      = 1103
export const ERROR_USERNAME_FORMAT       = 1104
export const ERROR_USERNAME_UNIQUE       = 1105

export const ERROR_EMAIL_REQUIRED        = 1111
export const ERROR_EMAIL_FORMAT          = 1112
export const ERROR_EMAIL_UNIQUE          = 1113

export const ERROR_PASSWORD_REQUIRED     = 1121
export const ERROR_PASSWORD_MINSIZE      = 1122
export const ERROR_PASSWORD_MAXSIZE      = 1123
export const ERROR_PASSWORD_FORMAT       = 1124

export const ERROR_LOGINNAME_REQUIRED    = 1131
export const ERROR_LOGINPASS_REQUIRED    = 1132
export const ERROR_LOGINVALID_FAIL       = 1133

export const ERROR_ACCESSTOKEN_NULL      = 1134

export const ERROR_NOTEBOOK_REQUIRED     = 1201
export const ERROR_NOTEBOOK_MAXSIZE      = 1202
export const ERROR_NOTEBOOK_FORMAT       = 1203
export const ERROR_NOTEBOOK_UNIQUE       = 1204
export const ERROR_NOTEBOOK_MARKUP       = 1205
export const ERROR_NOTEBOOK_USER         = 1206

export default [
  { code: ERROR_STATUS_NULL,           message: constant.ERROR_STATUS_NULL },

  { code: ERROR_USERNAME_REQUIRED,     message: constant.ERROR_USERNAME_REQUIRED },
  { code: ERROR_USERNAME_MINSIZE,      message: constant.ERROR_USERNAME_MINSIZE },
  { code: ERROR_USERNAME_MAXSIZE,      message: constant.ERROR_USERNAME_MAXSIZE },
  { code: ERROR_USERNAME_FORMAT,       message: constant.ERROR_USERNAME_FORMAT },
  { code: ERROR_USERNAME_UNIQUE,       message: constant.ERROR_USERNAME_UNIQUE },

  { code: ERROR_EMAIL_REQUIRED,        message: constant.ERROR_EMAIL_REQUIRED },
  { code: ERROR_EMAIL_FORMAT,          message: constant.ERROR_EMAIL_FORMAT },
  { code: ERROR_EMAIL_UNIQUE,          message: constant.ERROR_EMAIL_UNIQUE },

  { code: ERROR_PASSWORD_REQUIRED,     message: constant.ERROR_PASSWORD_REQUIRED },
  { code: ERROR_PASSWORD_MINSIZE,      message: constant.ERROR_PASSWORD_MINSIZE },
  { code: ERROR_PASSWORD_MAXSIZE,      message: constant.ERROR_PASSWORD_MAXSIZE },
  { code: ERROR_PASSWORD_FORMAT,       message: constant.ERROR_PASSWORD_FORMAT },

  { code: ERROR_LOGINNAME_REQUIRED,    message: constant.ERROR_LOGINNAME_REQUIRED },
  { code: ERROR_LOGINPASS_REQUIRED,    message: constant.ERROR_LOGINPASS_REQUIRED },
  { code: ERROR_LOGINVALID_FAIL,       message: constant.ERROR_LOGINVALID_FAIL },

  { code: ERROR_ACCESSTOKEN_NULL,      message: constant.ERROR_ACCESSTOKEN_NULL },

  { code: ERROR_NOTEBOOK_REQUIRED,     message: constant.ERROR_NOTEBOOK_REQUIRED },
  { code: ERROR_NOTEBOOK_MAXSIZE,      message: constant.ERROR_NOTEBOOK_MAXSIZE },
  { code: ERROR_NOTEBOOK_FORMAT,       message: constant.ERROR_NOTEBOOK_FORMAT },
  { code: ERROR_NOTEBOOK_UNIQUE,       message: constant.ERROR_NOTEBOOK_UNIQUE },
  { code: ERROR_NOTEBOOK_MARKUP,       message: constant.ERROR_NOTEBOOK_MARKUP },
  { code: ERROR_NOTEBOOK_USER,         message: constant.ERROR_NOTEBOOK_USER   },
]