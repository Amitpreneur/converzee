const webpack = require('webpack');
var path = require('path');
require('babel-polyfill');
module.exports = {
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
              outputPath: 'asset/',
              publicPath: '',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 9000,
    disableHostCheck: true
  },
};
