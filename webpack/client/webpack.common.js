// const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackSimpleProgressPlugin = require('webpack-simple-progress-plugin');
const webpackGlobConfig = require('./webpack.globs.js');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  output: {
    path: webpackGlobConfig.BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [webpackGlobConfig.APP_DIR],
        exclude: [path.resolve(`${__dirname}/../..`, 'node_modules')],
        loader: 'babel-loader',
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|jpe?g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  context: __dirname,
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new WebpackSimpleProgressPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'ENZA - Cognitive Research Assistant',
    //   template: `${webpackGlobConfig.APP_DIR}/index.html`,
    //   hash: true,
    //   minify: {
    //     collapseWhitespace: true
    //   }
    // }),
    new FaviconsWebpackPlugin(
      `${webpackGlobConfig.APP_DIR}/assets/images/logo.png`
    )
  ]
};

module.exports = config;
