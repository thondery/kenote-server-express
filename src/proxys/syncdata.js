import Promise from 'bluebird'
import { syncdataDao, uniqueError } from '../models'
import _ from 'lodash'
import moment from 'moment'
import * as notebookProxy from './notebook'
import * as deleteProxy from './delete'
import uuid from 'node-uuid'

// 创建一条数据
export const create = info => {
  return new Promise( (resolve, reject) => {
    syncdataDao.create(info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 查询单个用户
export const findOne = info => {
  return new Promise( (resolve, reject) => {
    syncdataDao.one(info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 更新单条数据
function updateOne (query, info) {
  return new Promise( (resolve, reject) => {
    syncdataDao.updateOne(query, info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

export const getSyncInfo = (uid) => {
  return findOne({ user: uid })
    .then( doc => doc 
      ? _.pick(doc, ['updateCount', 'fullSyncBefore']) 
      : {
        updateCount: 0,
        fullSyncBefore: 0
      })
}

export const setSyncInfo = (uid, result = null) => {
  let updateCount = 1
  let fullSyncBefore = moment().format('x')
  return findOne({ user: uid })
    .then( doc => {
      if (doc) {
        updateCount = doc.updateCount + 1
        return updateOne({ user: uid }, {
          updateCount,
          fullSyncBefore
        })
      }
      else {
        return create({
          user: uid,
          updateCount,
          fullSyncBefore
        })
      }
    })
    .then( doc => result ? result : getSyncInfo(uid) )
}



// 获取完全同步数据
export const fullSyncData = (user) => {
  let info = { type: 'full', token: uuid.v4() }
  return notebookProxy.fullSyncData(user)
    .then( doc => {
      info.notebook = doc
      return info
    })
}

// 获取增量同步数据
export const increaseSyncData = (user, usn) => {
  let info = { type: 'increase', token: uuid.v4() }
  return notebookProxy.increaseSyncData(user, usn)
    .then( doc => {
      info.notebook = doc
      return info
    })
}

// 获取直接发送改变权限
export const noneSyncData = () => {
  let info = { type: 'none', token: uuid.v4() }
  return info
}

export const saveSyncData = (payload, user) => {
  let updateCount = 0
  let fullSyncBefore = 0
  let info = {}
  let isUpdated = false
  return getSyncInfo(user)
    .then( ret => {
      updateCount = ret.updateCount
      fullSyncBefore = ret.fullSyncBefore
      if (!payload.notebook) return null
      let data = {
        payload: payload.notebook,
        updateCount: updateCount
      }
      return notebookProxy.batchUpdate(data, user)
    })
    .then( doc => {
      info = { ...info, notebook: doc }
      if (doc) isUpdated = true
      let ids = _.uniq(_.flatten(_.map(_.filter(payload.delete, { table: 'notebook' }), 'serverId')))
      return notebookProxy.remove({ user: user, _id: { $in: ids }})
    })
    .then( doc => {
      return isUpdated
    })
    .then( doc => {
      if (doc) {
        return setSyncInfo(user)
      }
      else {
        return getSyncInfo(user)
      }
    })
    .then( doc => {
      let { updateCount, fullSyncBefore } = doc
      console.log(doc)
      info = { ...info, updateCount, fullSyncBefore }
      return info
    })
}