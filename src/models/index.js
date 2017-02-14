import mongoose from 'mongoose'
import Promise from 'bluebird'
import MongooseDao from 'mongoosedao'
import fs from 'fs'

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

const modelFiles = fs.readdirSync(__dirname)
const model = {}

modelFiles.map( file => {
  let fileName = file.replace(/\.js$/i, '')
  if (fileName !== 'index') {
    model[`${fileName}Dao`] = getMongooseDao(require(`./${file}`).default, fileName)
  }
})

module.exports = model