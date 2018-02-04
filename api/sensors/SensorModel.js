// import mongoose from 'mongoose';
const mongoose = require('mongoose');

let sensorSchema = new mongoose.Schema({
  deviceId:{type:String,required:true,unique:true}
});

module.exports = mongoose.model('Sensor', sensorSchema);