const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const webpackGlobConfig = require('../../../webpack/client/webpack.globs.js');

module.exports = (app) => {
  // remove x-powered-by
  app.disable('x-powered-by');
  // Add express stuff
  app.use(compression());
  app.use(bodyParser.json({
    limit: '20mb'
  }));
  app.use(express.static(`${webpackGlobConfig.BUILD_DIR}`));
};
