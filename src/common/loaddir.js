import fs from 'fs'
import path from 'path'

function loadFileToExport (dir, suffix) {
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

function loadFileToModel (dir, func) {
  let model = {}
  let files = fs.readdirSync(dir)
  files.map( file => {
    let fileName = file.replace(/\.js$/i, '')
    if (fileName !== 'index') {
      model[`${fileName}Dao`] = func(require(path.resolve(dir, file)).default, fileName)
    }
  })
  return model
}

export {
  loadFileToExport,
  loadFileToModel
}