const Sensor = require('./SensorModel')
const SensorData = require('./SensorDataModel')
const SensorUser = require('./SensorUserModel')

const saveSensorUser = (userId, deviceId) => {
  return Sensor
    .findOne({deviceId})
    .then((sensor) => {
      if (sensor) return sensor;
      const newSensor = new Sensor({deviceId});
      return newSensor.save();
    }).then((sensor) => {
      return SensorUser.findOneAndUpdate({sensorId: sensor._id}, {$addToSet: {users: [userId]}}, {
        upsert: true,
        new: true
      });
    }).then((sensorUser) => {
      console.log('saving SensorUser succeded senserUser: ', sensorUser);
    }).catch((err) => {
      console.log('saving SensorUser error: ', err);
    });
}

const saveSensor = (deviceId) => {
  return Sensor
    .findOne({deviceId})
    .then((sensor) => {
      if (sensor) throw  new Error('sensor exists');
      const newSensor = new Sensor({deviceId});
      return newSensor.save();
    });
}

const saveSensorData = (deviceId, data) => {
  Sensor
    .findOne({deviceId})
    .then((sensor) => {
      if (sensor === null) {
        return saveSensor(deviceId);
      }
      return sensor;
    })
    .then((sensor) => {
      if (sensor === null) return (new Error('sensor not found'));
      const newData = new SensorData({sensorId: sensor._id, data});
      return newData.save();
    })
    .then((sensorData) => {
      console.log('saved sensorData :', sensorData);
    })
    .catch((err) => {
      console.log('error saving sensorData errror: ', err)
    });
}

module.exports = {saveSensor, saveSensorData, saveSensorUser}