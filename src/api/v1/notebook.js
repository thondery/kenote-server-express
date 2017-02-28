import { notebookProxy } from '../../proxys'
import { optionError } from '../../models'

/**
 * @api {post} /notebook/create 创建用户笔记本
 * @apiVersion 0.1.0
 * @apiName create
 * @apiGroup NoteBook
 *
 * @apiParam {String} accesstoken 访问令牌.
 * @apiParam {String} name 笔记本名
 *
 * @apiSuccess {ObjectId} _id 笔记本ID.
 * @apiSuccess {String} name  笔记本名.
 * @apiSuccess {Date} create_at  创建时间.
 */
export const create = (data, req, res, next) => {
  notebookProxy.addNoteBook(data)
    .then( doc => {
      return res.api(doc)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}

/**
 * @api {get} /notebook/list 获取用户笔记本列表
 * @apiVersion 0.1.0
 * @apiName list
 * @apiGroup NoteBook
 *
 * @apiParam {String} accesstoken 访问令牌.
 *
 * @apiSuccess {Object[]} profiles       List of notebook profiles.
 * @apiSuccess {Number} profiles._id 笔记本ID.
 * @apiSuccess {String} profiles.name  笔记本名.
 * @apiSuccess {Date} profiles.create_at  创建时间.
 */
export const list = (data, req, res, next) => {
  notebookProxy.noteBookList(data, null, { _id: 1, name: 1, create_at: 1 })
    .then( doc => {
      return res.api(doc)
    })
    .catch( optionError, err => {
      return res.api(null, err.code)
    })
    .catch( err => next(err) )
}