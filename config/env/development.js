'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
  debug: true,
  logging: {
    format: 'tiny'
  },
  //  aggregate: 'whatever that is not false, because boolean false value turns aggregation off', //false
  aggregate: false,
  mongoose: {
    debug: false
  },
  hostname: 'http://localhost:3000',
  app: {
    name: 'CDP - Next Gen Code Deployment Procedure'
  },
  strategies: {
    local: {
      enabled: true
    },
    landingPage: '/'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
      "type": "smtp",
      "host": "iil.intel.com",
      "secure": false,
      "port": 587,
      "tls": {
          "rejectUnauthorized": false
      }
  },
  secret: 'SOME_TOKEN_SECRET'
};
