export default {
  name            : 'kenote',
  debug           : true,
  host            : 'localhost',
  port            : 4000,
  logger          : {
                      path            : 'logger',
                      filename        : 'access.log',
                      maxlogsize      : 500,
                      category        : 'Kenote',
                      format          : ':method :url :status',
                      level           : 'auto'
                    },
  mongo_uri       : 'mongodb://localhost:27017/kenote',
  mongo_perfix    : 'kenote_',
}