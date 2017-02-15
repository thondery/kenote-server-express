import fs from 'fs'
import path from 'path'

export function loadFileToExport (dir, suffix) {
  let obj = {}
  let files = fs.readdirSync(dir)
  files.map( file => {
    let fileName = file.replace(/\.js$/i, '')
    if (fileName !== 'index') {
      obj[`${fileName}${suffix}`] = require(path.resolve(dir, file))
    }
  })
  return obj
}

export function loadFileToModel (dir, func) {
  let model = {}
  model['uniqueError'] = e => e.code === 11000
  model['optionError'] = e => e.code >= 1000
  let files = fs.readdirSync(dir)
  files.map( file => {
    let fileName = file.replace(/\.js$/i, '')
    if (fileName !== 'index') {
      model[`${fileName}Dao`] = func(require(path.resolve(dir, file)).default, fileName)
    }
  })
  return model
}