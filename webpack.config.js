let path = require('path');


module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    //publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    // port: 5001,
    contentBase: './'
  }
};
