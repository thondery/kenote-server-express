import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default {
  username   : { type: String, required: true, index: { unique: true } },   // 用户名
  password   : { type: String, required: true },                            // 密码加密值
  nickname   : { type: String },                                            // 昵称
  email      : { type: String, required: true, index: { unique: true } },   // 邮箱
  salt       : { type: String },                                            // 密码加密盐
  accesskey  : { type: String },                                            // 安全连接密钥
  create_at  : { type: Date, default: Date.now },                           // 帐号创建时间
  update_at  : { type: Date, default: Date.now },                           // 帐号修改时间
}