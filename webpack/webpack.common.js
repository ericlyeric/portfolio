const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/scripts/game.js'],
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'Eric Ly | portfolio',
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      { from: 'src/favicon.ico', to: '' },
    ]),
  ],
};
