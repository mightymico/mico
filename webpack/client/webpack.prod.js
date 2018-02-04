const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UgliyfyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpackGlobConfig = require('./webpack.globs.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const prodConfig = merge(common, {
  entry: ['whatwg-fetch', `${webpackGlobConfig.APP_DIR}/index.jsx`],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new UgliyfyjsWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Mico',
      template: `${webpackGlobConfig.APP_DIR}/index.tpl`,
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin([`${webpackGlobConfig.BUILD_DIR}/**/*`], {
      root: path.resolve(`${__dirname}/../..`)
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ]
});

module.exports = prodConfig;
