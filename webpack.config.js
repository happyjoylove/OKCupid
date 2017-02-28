var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: 8080
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      include: path.resolve(__dirname, 'app'),
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.js[x]?$/,
      include: path.resolve(__dirname, 'app'),
      exclude: /node_modules/,
      loaders: ['babel', 'eslint']
    }, ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
};
