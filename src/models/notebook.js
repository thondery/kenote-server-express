import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema
const perfix = config.mongo_perfix

export default {
  name       : { type: String, required: true },   // 笔记本名
  user       : { type: Schema.Types.ObjectId, ref: `${perfix}user` },       // 所属用户
  create_at  : { type: Date, default: Date.now },                           // 创建时间
}