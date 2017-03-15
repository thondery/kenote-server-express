// ------------------------------------
// Constants
// ------------------------------------
export const ERROR_STATUS_NULL           = `Request Success!`

export const ERROR_USERNAME_REQUIRED     = `用户名不能为空`
export const ERROR_USERNAME_MINSIZE      = `用户名字节长度不足`
export const ERROR_USERNAME_MAXSIZE      = `用户名字节长度超出`
export const ERROR_USERNAME_FORMAT       = `用户名不规范，只允许英文字母和数字、下划线组成`
export const ERROR_USERNAME_UNIQUE       = `用户名已存在`

export const ERROR_EMAIL_REQUIRED        = `邮箱地址不能为空`
export const ERROR_EMAIL_FORMAT          = `邮箱地址不正确`
export const ERROR_EMAIL_UNIQUE          = `邮箱地址已存在`

export const ERROR_PASSWORD_REQUIRED     = `密码不能为空`
export const ERROR_PASSWORD_MINSIZE      = `密码字节长度不足`
export const ERROR_PASSWORD_MAXSIZE      = `密码字节长度超出`
export const ERROR_PASSWORD_FORMAT       = `密码格式不正确`

export const ERROR_LOGINNAME_REQUIRED    = `用户名/邮箱不能为空`
export const ERROR_LOGINPASS_REQUIRED    = `登录密码不能为空`
export const ERROR_LOGINVALID_FAIL       = `用户名/密码错误！`

export const ERROR_ACCESSTOKEN_NULL      = `尚未登录或登录已失效`

export const ERROR_NOTEBOOK_REQUIRED     = `笔记本名不能为空`
export const ERROR_NOTEBOOK_MAXSIZE      = `笔记本名超出字节长度`
export const ERROR_NOTEBOOK_FORMAT       = `名称限制在中文、英文字母、数字、下划线和减号之间`
export const ERROR_NOTEBOOK_UNIQUE       = `笔记本名已存在`
export const ERROR_NOTEBOOK_MARKUP       = `缺少笔记本标记`
export const ERROR_NOTEBOOK_USER         = `不能修改其他用户的笔记本`