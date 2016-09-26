'use strict';
const webpack = require("webpack");
const ClosureCompiler = require('google-closure-compiler-js').webpack;
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
    new ClosureCompiler({
      options: {
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
      },
    }),
    //new webpack.optimize.CommonsChunkPlugin('app','app.js'),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};

module.exports = webpackConfig;