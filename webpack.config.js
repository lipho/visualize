const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: {
    jsx: "./src/index.jsx",
    html: "./src/index.html",
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: "bundle.js",
  },
  module: {
    /*    preLoaders: [
     //Eslint loader
     {test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"},
     ],*/
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin
        .extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        exclude: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
        presets: ['es2015', 'react'],
      },
    ],
  },
  postcss: [autoprefixer],
  resolve: {
    extensions: ['', '.js', '.jsx', 'css'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './../node_modules'),
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new TransferWebpackPlugin([{
      from: 'src/globals',
      to: 'globals'
    }], path.resolve(__dirname, './')),
  ],
  eslint: {
    configFile: './.eslintrc'
  },
};
