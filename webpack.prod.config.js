const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽离css
const base = require('./webpack.base.config');
base.plugins.push(new UglifyJSPlugin()); //webpack4 该source map默认false
const config = {
    ...base
};
module.exports = config;