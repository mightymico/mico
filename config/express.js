const express = require('express');
const bodyParser = require('body-parser');

module.exports = (app, config) => {
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
  }));
  app.use(bodyParser.json({
    limit: '10mb'
  }));
  app.use(express.static(`${config.rootPath}/src/client/dist`));
};
