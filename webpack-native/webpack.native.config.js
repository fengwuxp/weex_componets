const webpack = require('webpack');
const {config} = require('./GetNativeBaseConfig.js');
const {DEV_API_ADDRESS,TEST_H5_WEB_CONTEXT} = require("../../../webpack-config/WebpackConfig");

const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});
if (config.plugins == null) {
    config.plugins = [];
}
config.plugins.push(bannerPlugin);
config.plugins.unshift(new webpack.DefinePlugin({
    'process.env': {
        IS_WEB: false,
        NODE_ENV: '"dev"',
        API_ROOT: JSON.stringify(DEV_API_ADDRESS),
        H5_WEB_CONTEXT:JSON.stringify(TEST_H5_WEB_CONTEXT)
    }
}));
module.exports = config;