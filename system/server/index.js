const config = require('../../config');
const http = require('http');
const { logger } = require('../index.js');
const app = require('./server.dev.js');

const serverConfig = config.server.development;

const server = {
  start: function start() {
    const httpServer = http.createServer(app);
    httpServer.listen(serverConfig.port, serverConfig.ip);

    logger.info(`Server running at https://localhost:${serverConfig.port}`);
  }
};

server.start();
