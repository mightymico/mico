// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sensorUserSchema = new mongoose.Schema({
  sensorId: {type: Schema.Types.ObjectId, ref: 'Sensor', required: true},
  users:[Schema.Types.ObjectId]
});

module.exports = mongoose.model('SensorUser', sensorUserSchema);