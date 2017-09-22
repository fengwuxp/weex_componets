const webpack = require('webpack');
const {config} = require('./GetNativeBaseConfig.js');
const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});

config.plugins = [
    bannerPlugin
];
module.exports = config;