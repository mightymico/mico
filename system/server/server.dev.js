const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack/client/webpack.dev.js');
const middlewares = require('./middlewares');
const routes = require('./routes');

const compiler = webpack(webpackConfig);
const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

middlewares(app);
routes(app);

module.exports = app;
