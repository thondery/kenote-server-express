import mongoose from 'mongoose'
import Promise from 'bluebird'
import MongooseDao from 'mongoosedao'
import { loadFileToModel } from '../common/loaddir'

import config from '../config'
import logger from '../common/logger'

const Schema = mongoose.Schema
mongoose.Promise = Promise
mongoose.connect(config.mongo_uri, {
  server: { poolSize: 20 }
}, err => {
  if (err) {
    logger.error(`connect to ${config.mongo_uri} error: ${err.message}`)
    process.exit(1)
  }
})

function getMongooseDao (definition, name, perfix = config.mongo_perfix) {
  let schema = new Schema(definition)
  let model = mongoose.model(`${perfix}${name}`, schema)
  return new MongooseDao(model)
}

module.exports = loadFileToModel(__dirname, getMongooseDao)