const Alexa = require('alexa-sdk');
const config = require('../../config').app;
const logger = require('../index').logger;

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = config.APP_ID // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'SensorIntent' : () => {
    logger.info(this.event);
    //emit response directly
    this.emit(':tell', 'Hello World!');
  }
};
