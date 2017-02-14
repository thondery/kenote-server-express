const ENV_DEVELOPMENT = 'development'
const ENV_PRODUCTION  = 'production'

const config = {
  [ENV_PRODUCTION]    : require('./config.production'),
  [ENV_DEVELOPMENT]   : require('./config.development')
}

function getConfig () {
  return config[process.env.NODE_ENV] || require('./config.development')
}

export default getConfig().default