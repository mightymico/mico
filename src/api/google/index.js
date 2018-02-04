const express = require('express');
const router = express.Router();
const { logger } = require('../../../system');

router.get('/', (req, res) => {
  res.send({
    data: 'ok'
  });
});

module.exports = router;
