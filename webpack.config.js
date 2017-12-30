let path = require('path');
let webpack = require('webpack');


module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?quiet=true',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
      }
    }, {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
