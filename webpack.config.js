'use strict';

const webpack = require('webpack'),
      glob = require('glob'),
      path = require('path');

let config = {
  cache: true,
  entry: {
    // Add any third party modules you'd like included on all pages.
    'vendor': [
      'react',
      'react-dom',
      'lodash'
    ],

    // Auto-detect all components in directory.
    'components': glob.sync('./src/**/render.jsx'),
  },
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'bundle--[name].js',
  },
  module: {
    loaders: [
      // Javascript: js, jsx
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      // CSS: scss, css
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass', 'postcss-loader']
      },
      // SVGs: svg, svg?something
      {
        test: /\.svg(\?.*$|$)/,
        loader: 'file-loader?name=/img/[name].[ext]'
      },
      // Images: png, gif, jpg, jpeg
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'file?name=/img/[name].[ext]'
      },
      // HTML: htm, html
      {
        test: /\.html?$/,
        loader: "file?name=[name].[ext]"
      },
      // Font files: eot, ttf, woff, woff2
      {
        test: /\.(eot|ttf|woff2?)(\?.*$|$)/,
        loader: 'file?name=/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    // Pro-tip: Order matters here.
    new webpack.optimize.CommonsChunkPlugin(['components', 'vendor'], 'bundle--[name].js'),
    // Use the production version of third party libraries.
    // new webpack.DefinePlugin({
    //   'process.env':{
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // Minify assets.
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: true,
    //   output: {
    //       comments: false
    //   },
    //   compress: {
    //     warnings: false // https://github.com/webpack/webpack/issues/1496
    //   }
    // })
  ]
};

module.exports = config;
