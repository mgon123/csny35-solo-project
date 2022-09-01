const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] }
      },
    ]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    // publicPath: '/dist/',
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './client/index.html',
      filename: './index.html',
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    // contentBase: path.join(__dirname, 'client/'),
    port: 8000,
    proxy: {
      '/savefavorite': {
        target: 'http://localhost:3000/',
        secure: false,
      }
    }
    // publicPath: 'http://localhost:3000/',
    // hotOnly: true
  },
};