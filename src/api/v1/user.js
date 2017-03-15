import { userProxy, notebookProxy, syncdataProxy } from '../../proxys'
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
  let info = {}
  userProxy.accessToken(data.accesstoken)
    .then( auth => {
      info = { ...info, auth }
      return notebookProxy.noteBookList({ user: auth._id }, null, { _id: 1, name: 1, create_at: 1 })
    })
    .then( notebook => {
      info = { ...info, notebook }
      return res.api(info)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}

export const syncDataRequest = (data, req, res, next) => {
  let { user, lastUpdateCount, lastSyncTime } = data
  syncdataProxy.getSyncInfo(user)
    .then( doc => {
      let { updateCount, fullSyncBefore } = doc
      console.log('lastUpdateCount ->', lastUpdateCount)
      console.log('updateCount ->', updateCount)
      if (lastUpdateCount == 0 && updateCount > 0) {
        // 客户端从未更新过，进行<完全同步> => 客户端<发送改变>
        return syncdataProxy.fullSyncData(user)
      }
      else if (updateCount == lastUpdateCount) {
        // 无需从服务器更新，客户端直接<发送改变>
        return syncdataProxy.noneSyncData()
      }
      else {
        // 反之进行<增量同步> => 客户端<发送改变>
        return syncdataProxy.increaseSyncData(user, lastUpdateCount)
      }
    })
    .then( doc => {
      return res.api(doc)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}

export const syncDataSend = (data, req, res, next) => {
  let { user, payload } = data
  syncdataProxy.saveSyncData(payload, user)
    .then( doc => {
      return res.api(doc)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )

}

// 
export const syncDataByGet = (data, req, res, next) => {
  console.log(notebookProxy.batchUpdate([{_id: 'aaa', name: 'sss', create_at: '111', update_at: '222'}], '123'))
  let info = {}
  notebookProxy.noteBookList(data, null, { _id: 1, name: 1, create_at: 1, update_at: 1 })
    .then( notebook => {
      info = { ...info, notebook }
      return res.api(info)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}

export const syncDataByPost = (data, req, res, next) => {
  let info = {}
  
}