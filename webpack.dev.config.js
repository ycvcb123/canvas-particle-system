const webpack = require('webpack');
const path = require('path');
const base = require('./webpack.base.config');
base.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000,
    hot: true,
    // host: '0.0.0.0',
    // disableHostCheck: true
};
base.devtool = 'inline-source-map';
base.module.rules[0].use.unshift('css-hot-loader');
base.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin());
const config = {
    ...base
};
module.exports = config;