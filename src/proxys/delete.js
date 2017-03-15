import Promise from 'bluebird'
import { deleteDao, uniqueError } from '../models'
import _ from 'lodash'
import moment from 'moment'
import * as syncdataProxy from './syncdata'

// 创建一条数据
export const create = info => {
  return new Promise( (resolve, reject) => {
    deleteDao.create(info, (err, doc) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
}

// 查询多条数据
export const find = (query, populate = { path: '' }, fields = null, sort = { _id: -1 }, limit = 0, skip = 0) => {
  return new Promise( (resolve, reject) => {
    deleteDao.model.find(query)
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

export const setSyncData = (user, table, ids) => {
  return syncdataProxy.getSyncInfo(user)
    .then( doc => {
      let updateCount = doc.updateCount + 1
      return create({
        user: user,
        related_id: ids,
        related_table: table,
        usn: updateCount
      })
    })
}

// 获取删除记录列表
export const getSyncData = (query, populate = null, fields = null, sort = { _id: -1 }, limit = 0, skip = 0) => {
  populate = populate ? populate : { path: '' }
  return find(query, populate, fields, sort, limit, skip)
}