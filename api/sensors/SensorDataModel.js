// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sensorSchema = new mongoose.Schema({
  sensorId: {type: Schema.Types.ObjectId, ref: 'Sensor', required: true},
  data: {type: Schema.Types.Mixed}
});

module.exports = mongoose.model('SensorData', sensorSchema);