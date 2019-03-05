const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.config.js');

baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = webpackMerge(baseConfig, {
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  mode: 'development',
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname,'..'),
    inline: true, //实时刷新
    hot: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
})