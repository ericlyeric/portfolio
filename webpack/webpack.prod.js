const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prod = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 2,
          },
          mangle: true,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    usedExports: true, // Tree-shaking: mark used exports
    sideEffects: false, // Phaser and dependencies have no side effects
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          priority: 10,
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
          name: 'common',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      name: 'Eric Ly | Portfolio',
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../docs/*.js')],
    }),
  ],
};

module.exports = merge(common, prod);
