const mqtt = require('mqtt')
const config = require('./../config');

const client = mqtt.connect(config.mqtt);
const sensorSer = require('./../sensors/dbService');

client.on('connect', function () {
  console.log('MQTT: connected!')
  client.subscribe('/devices/4e0f15215584211e20b17b024761b3a52f0d1b725cc5d07335bf4c28ff09afcb/events');

})

client.on('error', function (error) {
  console.log('MQTT: error: ', error);
})

client.on('message', (topic, message) => {
  if (topic === '/devices/4e0f15215584211e20b17b024761b3a52f0d1b725cc5d07335bf4c28ff09afcb/events') {
    try {
      const msg = JSON.parse(message.toString());
      sensorSer.saveSensorData(msg.device, msg.sensors);
    } catch (e) {
      console.log('error parsing mqtt message e: ', e);
    }
  }
})
module.exports = client;