import Promise from 'bluebird'
import { notebookDao, uniqueError } from '../models'
import crypto from 'crypto'
import uuid from 'node-uuid'
import _ from 'lodash'
import * as Tools from '../common/tools'
import * as CODE from '../error'
import moment from 'moment'
import * as syncdataProxy from './syncdata'
import * as deleteProxy from './delete'
import mongoose from 'mongoose'
//import { notebookProxy } from '../../proxys'

// 创建一条数据
export const create = info => {
  return new Promise( (resolve, reject) => {
    notebookDao.create(info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 查询单条数据
export const findOne = info => {
  return new Promise( (resolve, reject) => {
    notebookDao.one(info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 按条件删除数据
export function remove (query) {
  return new Promise( (resolve, reject) => {
    notebookDao.delete(query, err => {
      if (err) {
        reject(err)
      }
      else {
        resolve(null)
      }
    })
  })
}

// 删除所有数据
export const removeAll = () => {
  return new Promise( (resolve, reject) => {
    notebookDao.deleteAll( err => {
      if (err) {
        reject(err)
      }
      else {
        resolve(null)
      }
    })
  })
}

// 查询多条数据
export const find = (query, populate = { path: '' }, fields = null, sort = { _id: -1 }, limit = 0, skip = 0) => {
  return new Promise( (resolve, reject) => {
    notebookDao.model.find(query)
      .populate(populate)
      .select(fields)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec( (err, doc) => {
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
    notebookDao.updateOne(query, info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 创建新笔记本
export const addNoteBook = info => {
  return findOne(info)
    .then( doc => {
      if (doc) {
        let e = new Error(Tools.errInfo(CODE.ERROR_NOTEBOOK_UNIQUE).message)
        e.code = CODE.ERROR_NOTEBOOK_UNIQUE
        throw e
      }
      return syncdataProxy.getSyncInfo(info.user)
    })
    .then( doc => {
      let updateCount = doc.updateCount + 1
      return create({ ...info, usn: updateCount })
    })
    .then( doc => {
      return syncdataProxy.setSyncInfo(info.user, doc)
    })
    .then( doc => _.pick(doc, ['_id', 'name', 'create_at', 'update_at']))
}

// 修改笔记本
export const editNoteBook = (id, info, user) => {
  let _doc = null
  let updateAt
  return findOne({ name: info.name, _id: { $ne: id }, user: user})
    .then( doc => {
      if (doc) {
        let e = new Error(Tools.errInfo(CODE.ERROR_NOTEBOOK_UNIQUE).message)
        e.code = CODE.ERROR_NOTEBOOK_UNIQUE
        throw e
      }
      return findOne({ _id: id })
    })
    .then( doc => {
      let e
      if (!doc) {
        e = new Error(Tools.errInfo(CODE.ERROR_NOTEBOOK_MARKUP).message)
        e.code = CODE.ERROR_NOTEBOOK_MARKUP
        throw e
      }
      if (doc.user.toString() !== user.toString()) {
        e = new Error(Tools.errInfo(CODE.ERROR_NOTEBOOK_USER).message)
        e.code = CODE.ERROR_NOTEBOOK_USER
        throw e
      }
      _doc = doc
      return syncdataProxy.getSyncInfo(user)
    })
    .then( doc => {
      let updateCount = doc.updateCount + 1
      updateAt = moment().format()
      return updateOne({ _id: id }, { ...info, usn: updateCount, update_at: updateAt })
    })
    .then( doc => {
      return syncdataProxy.setSyncInfo(user, _doc)
    })
    .then( doc => {
      let e = Object.assign(doc, info, { update_at: updateAt })
      return _.pick(e, ['_id', 'name', 'create_at', 'update_at'])
    })
}

// 删除笔记本
export const deleteByIds = (uid, ids = []) => {
  return remove({ user: uid, _id: { $in: ids }})
    .then( () => {
      return deleteProxy.setSyncData(uid, 'notebook', ids)
    })
    .then( () => {
      return syncdataProxy.setSyncInfo(uid)
    })
}

// 获取笔记本列表
export const noteBookList = (query, populate = null, fields = null, sort = { _id: -1 }, limit = 0, skip = 0) => {
  populate = populate ? populate : { path: '' }
  return find(query, populate, fields, sort, limit, skip)
}

// 获取完全同步数据
export const fullSyncData = (user) => {
  return noteBookList({ user: user }, null, { _id: 1, name: 1, create_at: 1, update_at: 1 })
}

// 获取增量同步数据
export const increaseSyncData = (user, usn) => {
  let info = {}
  return noteBookList({ user: user, usn: { $gt: usn } }, null, { _id: 1, name: 1, create_at: 1, update_at: 1 })
    .then( doc => {
      info.result = doc
      return deleteProxy.getSyncData({ user: user, related_table: 'notebook', usn: { $gt: usn } })
    })
    .then( doc => {
      let deleteIds = _.uniq(_.flatten(_.map(doc, 'related_id')))
      return { ...info, delete: deleteIds }
    })
}

// 大批量更新
export const batchUpdate = (data, uid) => {
  let operations = []
  let { payload, updateCount } = data
  let times = moment().format()
  payload = payload || []
  updateCount = updateCount + 1
  for (let item of payload) {
    let oneInc
    if (item.serverId && item.serverId.length == 24) {
      oneInc = {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(item.serverId) }, 
          update: {
            $set: {
              name: item.name,
              update_at: times,
              usn: updateCount
            }
          }
        },
      }
    }
    else {
      oneInc = {
        insertOne: { 
          document: {
            name: item.name,
            user: uid,
            create_at: times,
            update_at: times,
            usn: updateCount
          } 
        }
      }
    }
    operations.push(oneInc)
  }
  if (operations.length === 0) {
    return null
  }
  return bulkWrite(operations)
    .then( doc => {
      let { insertedIds, upsertedIds } = doc
      return { ...insertedIds, ...upsertedIds}
    })
    .then( doc => {
      let info = []
      for (let i = 0; i < payload.length; i++) {
        let opts = payload[i].serverId == '' ? { serverId: doc[i], createAt: times } : null
        info[i] = {
          ...payload[i],
          ...opts,
          updateAt: times,
          is_sync: false
        }
      }
      return info
    })
}


// 集合操作
export const bulkWrite = (payload) => {
  return new Promise( (resolve, reject) => {
    notebookDao.model.collection.bulkWrite(payload, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}