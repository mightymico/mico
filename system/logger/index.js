const winston = require('winston');
const config = require('./config');

module.exports = () => {
  const infoLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)(config),
      new (winston.transports.Console)({
        level: 'info',
        colorize: true,
      }),
    ],
  });
  return infoLogger;
};
