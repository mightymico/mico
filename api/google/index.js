const express = require('express');
const router = express.Router();
const logger = require('../../system').logger;

router.get('/', (req, res) => {
  logger.info(req);  
  res.send({
    data: 'ok'
  });
});

module.exports = router;
