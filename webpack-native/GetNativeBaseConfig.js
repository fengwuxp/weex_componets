const path = require('path');
const fs = require('fs');


const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {isExclude} = require('./WebpackUtils.js');

let {
    NATIVE_EXCLUDE_FILES,
    ANDROID_DIR,
    IOS_DIR,
    IMAGE_PATH
} = require("../../../webpack-config/WebpackConfig");

if (NATIVE_EXCLUDE_FILES === undefined || NATIVE_EXCLUDE_FILES === null) {
    NATIVE_EXCLUDE_FILES = [];
}

//默认安卓输出目录
const DEFAULT_ANDROID_DIR = "./app/android/app/src/main/assets/js";

//默认ios输出目录
const DEFAULT_IOS_DIR = "./app/ios/bundlejs";


ANDROID_DIR = ANDROID_DIR ? ANDROID_DIR : DEFAULT_ANDROID_DIR;

IOS_DIR = IOS_DIR ? IOS_DIR : DEFAULT_IOS_DIR;

IMAGE_PATH = IMAGE_PATH ? IMAGE_PATH : "./images";

//开发目录
const DEV_DIR = "./dist";

/**
 * 抓取要打包成原生js的vue文件
 * @param root
 * @param dir
 * @param entry
 * @param outPath
 */
const walk = function (root, dir, entry = {}, outPath) {
    const directory = path.join(__dirname, root, dir);
    fs.readdirSync(directory)
        .forEach(function (file) {
            const fullPath = path.join(directory, file);

            //是否排除打成原生js
            let isExclude = NATIVE_EXCLUDE_FILES.some((item) => {
                let regExp;
                if (item.constructor === String) {
                    regExp = new RegExp(item);
                } else if (item.constructor === RegExp) {
                    regExp = item;
                } else if (item.constructor === Function) {
                    return item(fullPath);
                }
                else {
                    console.warn("配置有误");
                    return false
                }
                return regExp.test(fullPath);
            });

            const stat = fs.statSync(fullPath);
            if (stat.isFile() && path.extname(fullPath) === '.vue' && !isExclude) {
                //dir.substr(6)是在dist里去掉views这层文件夹
                const name = path.join(outPath, dir.substr(6), path.basename(file, '.vue'));
                entry[name] = fullPath + '?entry=true'
            } else if (stat.isDirectory()) {
                const subdir = path.join(dir, file);
                walk(root, subdir, entry, outPath)
            }
        });
};

//输入
const entry = {};
const nativeRelease = process.env.NATIVE_RELEASE ? process.env.NATIVE_RELEASE : "";
if (nativeRelease.trim().length > 0) {
    //是否原生发布的包
    if (nativeRelease.indexOf("ANDROID") >= 0) {
        walk('../../../src', '/views', entry, ANDROID_DIR);
    }
    if (nativeRelease.indexOf("IOS") >= 0) {
        walk('../../../src', '/views', entry, IOS_DIR);
    }
    if (process.env.NOT_USE_DEV == null) {
        //默认会输出到开发环境的目录
        walk('../../../src', '/views', entry, DEV_DIR);
    }
} else {
    walk('../../../src', '/views', entry, DEV_DIR);
}


const config = {
    entry: entry,
    output: {
        filename: '[name].js',
    },
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".css", ".vue"]
    },

    node: {
        global: true
    },
    module: {
        rules: [
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
            }
            ,
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: isExclude
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                loaders: [
                    {
                        loader: "weex-loader",
                        options: {}
                    }
                ]
            }
        ]
    },
};


if (nativeRelease) {

    config.plugins = [];


    //先将打包目录清除
    config.plugins.push(new CleanWebpackPlugin([
        path.join(ANDROID_DIR, "",),
        path.join(IOS_DIR,"")
    ],{
        //root: __dirname,       　　　　　　　　　　//根目录
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        dry:      false        　　　　　　　　　　//启用删除文件
    }));

    //发布的情况下使用copy-webpack-plugiins进行文件复制

    // from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
    // to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
    // toType  file 或者 dir         可选，默认是文件
    // force   强制覆盖先前的插件           可选 默认false
    // context                         可选 默认base context可用specific context
    // flatten 只拷贝文件不管文件夹      默认是false
    // ignore  忽略拷贝指定的文件           可以用模糊匹配

    //将图片资源复制到对应的原始目录
    let from = path.join(IMAGE_PATH);
    if (nativeRelease.indexOf("ANDROID") >= 0) {
        config.plugins.push(
            new CopyWebpackPlugin([{
                from: from,
                to: path.join(ANDROID_DIR, IMAGE_PATH)
            }])
        );
    }
    if (nativeRelease.indexOf("IOS") >= 0) {
        config.plugins.push(
            new CopyWebpackPlugin([{
                from: from,
                to: path.join(IOS_DIR, IMAGE_PATH)
            }])
        );
    }
}

module.exports = {
    config: config
};
