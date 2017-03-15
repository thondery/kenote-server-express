import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema
const perfix = config.mongo_perfix

export default {
  user            : { type: Schema.Types.ObjectId, ref: `${perfix}user` },  // 当前账户UID
  related_id      : [Schema.Types.Mixed],                                   // 关联的ID
  related_table   : { type: String },                                       // 关联的表
  usn             : { type: Number, default: 0 },                           // 执行的USN值
}