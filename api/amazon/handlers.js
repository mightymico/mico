const logger = require('../../system').logger;

const handlers = {
  'SensorIntent' : () => {
    logger.info(this.event);
    //emit response directly
    this.emit(':tell', 'Hello World!');
  },
  'DeviceIntent' : () => {
    logger.info(this.event);
    this.emit(':tell', 'Hello World from device');
  }
};

module.exports.handlers = handlers;
