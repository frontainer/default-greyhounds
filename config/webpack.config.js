'use strict';
const webpack = require("webpack");

const webpackConfig = {
  entry: {
    'app': './src/ts/app.ts'
  },
  output: {
    path: 'public/assets/js',
    publicPath: '/assets',
    filename: "[name].js",
    sourceMapFilename: 'maps/[name].map',
    jsonpFunction: 'fr'
  },
  devtool: '#source-map',
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ],
    extensions: ['', '.ts', '.js', '.html']
  },
  module: {
    preLoaders: [
      { test: /\.ts$/, exclude:/node_modules/, loaders: ['tslint'] }
    ],
    loaders: [
      { test: /\.html$/, exclude:/node_modules/, loaders: ['html'] },
      { test: /\.ts$/, exclude:/node_modules/, loader: 'ts' }
    ]
  },
  plugins: [
  ],
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};

module.exports = webpackConfig;