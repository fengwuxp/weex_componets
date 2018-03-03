const webpack = require('webpack');
const {isExclude} = require('../webpack-native/WebpackUtils.js');


const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});


/**
 * 获取插件配置列表
 * @return {[null]}
 */
const getPlugins = (plugins=[])=>{
    const defPlugins= [bannerPlugin];
    plugins.forEach((item)=>{
        defPlugins[defPlugins.length]=item;
    });
    return defPlugins;
};

/**
 *获取web 基础打包配配置
 * @param config
 * @return {{entry: {app: string}, output: {path: string}, resolve: {extensions: [string,string,string,string,string,string]}, module: {rules: [null,null,null,null,null,null]}, plugins: *}}
 */
const getBaseConfig = function (config = {
    plugins: []
}) {

    return Object.assign({
        resolve: {
            extensions: [".ts", ".tsx", "d.ts", ".js", ".css", ".vue"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: isExclude
                }, {
                    test: /\.vue(\?[^?]+)?$/,
                    use: []
                },
                {
                    test: /\.ts[x]?$/,
                    exclude: isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true,
                                presets: ['es2015', 'stage-2']
                            }
                        },
                        {loader: "awesome-typescript-loader"}
                    ]
                },
                {
                    // 配置sass编译规则
                    test: /\.s[a|c]ss$/,
                    loader: ['style-loader', 'css-loader', "sass-loader"]
                },
                {
                    test: /\.less/,
                    loader: ['style-loader', 'css-loader', "sass-loader"]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                }
            ]
        },
    },config)

};

module.exports = {
    getBaseConfig
};
