
import express from 'express'
import log4js from 'log4js'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import compress from 'compression'
import cors from 'cors'
import http from 'http'
import path from 'path'
import fs from 'fs'

import config from './config'
import logger from './common/logger'


const app = express()
const staticDir = path.resolve(process.cwd(), 'public')
const routerDir = path.resolve(__dirname, 'routers')

if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir)
}

app.use(log4js.connectLogger(logger, {
  level: config.logger.level,
  format: config.logger.format
}))

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(methodOverride())

app.use(compress())

app.use(express.static(staticDir))


const routerFiles = fs.readdirSync(routerDir)
routerFiles.map( file => {
  if (/\.js$/.test(file)) {
    try {
      fs.readFileSync(path.resolve(routerDir, file))
      let _url = file.replace(/\.js$/i, '').replace(/\_/g, '/')
      if (_url === 'default') {
        app.use(`/`, cors(), require(`./routers/${file}`).default)
      }
      else {
        app.use(`/${_url}`, cors(), require(`./routers/${file}`).default)
      }
    } catch (error) {
      
    }
  }
})

const server = http.createServer(app)
const { host, port } = config
server.listen(port, host, () => {
  logger.info(`Your App Run on http://${host}:${port}`)
})

export default app