import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema
const perfix = config.mongo_perfix

export default {
  user              : { type: Schema.Types.ObjectId, ref: `${perfix}user` },  // 当前账户UID
  updateCount       : { type: Number, default: 0 },                           // 当前账户最大USN
  fullSyncBefore    : { type: Number, default: 0 },                           // 当前账户最后同步时间
}