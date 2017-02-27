import { userProxy } from '../../proxys'
import { optionError } from '../../models'

/**
 * @api {post} /register 用户注册
 * @apiVersion 0.1.0
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} username 电子邮箱.
 * @apiParam {String} password 登录密码.
 *
 * @apiSuccess {ObjectId} _id 用户ID.
 * @apiSuccess {String} username  用户名.
 * @apiSuccess {String} email  电子邮箱.
 * @apiSuccess {UUID} accesskey  访问令牌.
 * @apiSuccess {Date} create_at  注册时间.
 * @apiSuccess {Date} update_at  最后更新时间.
 */
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

/**
 * @api {post} /login 用户登录
 * @apiVersion 0.1.0
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} username 用户名或电子邮箱.
 * @apiParam {String} password 登录密码.
 *
 * @apiSuccess {ObjectId} _id 用户ID.
 * @apiSuccess {String} username  用户名.
 * @apiSuccess {String} email  电子邮箱.
 * @apiSuccess {UUID} accesskey  访问令牌.
 * @apiSuccess {Date} create_at  注册时间.
 * @apiSuccess {Date} update_at  最后更新时间.
 */
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

/**
 * @api {post} /accesstoken 验证访问令牌
 * @apiVersion 0.1.0
 * @apiName accessToken
 * @apiGroup User
 *
 * @apiParam {String} accesstoken 访问令牌.
 *
 * @apiSuccess {ObjectId} _id 用户ID.
 * @apiSuccess {String} username  用户名.
 * @apiSuccess {String} email  电子邮箱.
 * @apiSuccess {Date} create_at  注册时间.
 * @apiSuccess {Date} update_at  最后更新时间.
 */
export const accessToken = (data, req, res, next) => {
  userProxy.accessToken(data.accesstoken)
    .then( doc => {
      return res.api(doc)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}