const express = require('express');
const router = express.Router();
const logger = require('../../system').logger;
const Alexa = require('alexa-sdk');
const handlers = require('./handlers');

router.get('/', (req, res) => {
  logger.info(req);  
  res.send({
    data: 'ok'
  });
});

router.post('/', (req, res) => {
  logger.info(req.body);  
  const context = {
    succeed: result => {
      res.json(result);
    },
    fail: error => {
      res.satus(500).send(error)
    }
  }
  const alexa = Alexa.handker(req.body, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
});


module.exports = router;
