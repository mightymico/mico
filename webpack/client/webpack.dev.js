const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const webpackGlobConfig = require('./webpack.globs.js');

const eslintLoader = {
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: ['node_modules'],
  loader: 'eslint-loader'
};

const linter = process.env.LINTER === 'true' ? eslintLoader : {};

const devConfig = merge(common, {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'whatwg-fetch',
    `${webpackGlobConfig.APP_DIR}/index.jsx`
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      linter
    ]
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/api/*': 'http://127.0.0.1:8086',
      historyApiFallback: true
    },
    contentBase: webpackGlobConfig.BUILD_DIR,
    compress: true,
    historyApiFallback: true,
    hot: true,
    stats: 'minimal',
    open: false
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = devConfig;
