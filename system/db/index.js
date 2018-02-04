let mongoose = require('mongoose');
let config = require('../../config');

module.exports = function initialize(app) {
  app.mdb = config.db.mdb;
  mongoose.set('debug', true);

  let db = mongoose.connection;
  db.on('connecting', () => {
    console.log('connecting to MongoDB...');
  });

  db.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });
  db.on('connected', () => {
    app.enable('mongodb');
    console.log('MongoDB connected!');
  });
  db.once('open', () => {
    console.log('MongoDB connection opened!');
  });
  db.on('reconnected', () => {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', () => {
    app.disable('mongodb');
    console.log('MongoDB disconnected!');
    mongoose.connect(app.mdb, {useMongoClient: true, autoReconnect: true})
  })
  mongoose.connect(app.mdb, { autoReconnect: true})
};