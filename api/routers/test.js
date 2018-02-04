const express = require('express');
const router = express.Router();

const sensorService = require('./../sensors/dbService');

router.get('/', (req, res, next) => {
  const {userId, deviceId} = req.query;
  sensorService.saveSensorUser(userId, deviceId)
    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
})

module.exports = router;