import Promise from 'bluebird'
import { notebookDao, uniqueError } from '../models'
import crypto from 'crypto'
import uuid from 'node-uuid'
import _ from 'lodash'
import * as Tools from '../common/tools'
import * as CODE from '../error'

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
export const find = (query, populate = { path: '' }, fields = null, sort = { _id: 1 }, limit = 0, skip = 0) => {
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

// 创建新笔记本
export const addNoteBook = info => {
  return findOne(info)
    .then( doc => {
      if (doc) {
        let e = new Error(Tools.errInfo(CODE.ERROR_NOTEBOOK_UNIQUE).message)
        e.code = CODE.ERROR_NOTEBOOK_UNIQUE
        throw e
      }
      return create(info)
    })
    .then( doc => _.pick(doc, ['_id', 'name', 'create_at']))
}

// 获取笔记本列表
export const noteBookList = (query, populate = { path: '' }, fields = null, sort = { _id: 1 }, limit = 0, skip = 0) => {
  populate = populate ? populate : { path: '' }
  return find(query, populate, fields, sort, limit, skip)
}