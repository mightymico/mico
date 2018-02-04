const webpack = require('webpack');
const webpackGlobConfig = require('./webpack.globs.js');
const webpackNodeExternals = require('webpack-node-externals');
const StartServerWebpackPlugin = require('start-server-webpack-plugin');

const eslintLoader = {
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: ['node_modules'],
  loader: 'eslint-loader'
};

const linter = process.env.LINTER === 'true' ? eslintLoader : {};

const devServerConfig = {
  entry: ['webpack/hot/poll?1000', './system/server/index.js'],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: ['node_modules']
      },
      linter
    ]
  },
  watch: true,
  target: 'node',
  externals: [
    webpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  plugins: [
    new StartServerWebpackPlugin('./system/server/server.dev.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server')
      }
    })
  ],
  output: {
    path: webpackGlobConfig.BUILD_DIR,
    filename: 'server.js'
  }
};

module.exports = devServerConfig;
