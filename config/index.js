const app = require('./app');
const express = require('./express');
const logger = require('./logger');
const server = require('./server');
const db = require('./db');

module.exports = {
  server,
  app,
  express,
  logger,
  db
};
