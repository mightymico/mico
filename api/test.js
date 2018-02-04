const client = require('./util/mqttClient');

// /devices
// /4e0f15215584211e20b17b024761b3a52f0d1b725cc5d07335bf4c28ff09afcb/events

client.subscribe('/devices');

client.on('message', (topic, message) => {
  console.log()
  // if(topic === 'garage/connected') {
  //   connected = (message.toString() === 'true');
  // }
})