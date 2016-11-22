var log4js = require('log4js'); 

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/app.log', category: 'TRI_AUTO' }
  ]
});

module.exports = log4js.getLogger('TRI_AUTO');