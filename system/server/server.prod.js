const config = require('../../config');
const http = require('http');
const express = require('express');

const middlewares = require('./middlewares');
const routes = require('./routes');
const { logger } = require('../index.js');
const db = require('../db');

const serverConfig = config.server.production;
const app = express();

db(app);
middlewares(app);
routes(app);

const server = {
  start: function start() {
    const httpServer = http.createServer(app);
    httpServer.listen(serverConfig.port, serverConfig.ip);
    logger.info(`Server running at https://localhost:${serverConfig.port}`);
  }
};

server.start();
