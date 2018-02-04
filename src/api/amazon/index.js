const express = require('express');
const router = express.Router();
const { logger } = require('../../../system');
const Alexa = require('alexa-sdk');
const handlers = require('./handlers');

router.get('/', (req, res) => {
  res.send({
    data: 'ok'
  });
});

router.post('/', (req, res) => {
  logger.info(JSON.stringify(req.body, null, 2));  
  const context = {
    succeed: result => {
      res.json(result);
    },
    fail: error => {
      res.satus(500).send(error)
    }
  }
  const alexa = Alexa.handler(req.body, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
});


module.exports = router;
