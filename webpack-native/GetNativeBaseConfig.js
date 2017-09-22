const path = require('path');
const fs = require('fs');
const {isExclude} = require('./WebpackUtils.js');

const walk = function (root, dir, entry = {}) {
    const outPath = "./dist";
    const directory = path.join(__dirname, root, dir);
    fs.readdirSync(directory)
        .forEach(function (file) {
            const fullpath = path.join(directory, file);
            const stat = fs.statSync(fullpath);
            if (stat.isFile() && path.extname(fullpath) === '.vue') {
                //dir.substr(6)是在dist里去掉pages这层文件夹
                const name = path.join(outPath, dir.substr(6), path.basename(file, '.vue'));
                entry[name] = fullpath + '?entry=true'
            } else if (stat.isDirectory()) {
                const subdir = path.join(dir, file);
                walk(root, subdir, entry)
            }
        });
};

const entry = {};

walk('../../../src', '/views', entry);

const config = {
    entry: entry,
    output: {
        //path: "",
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


module.exports = {
    walk: walk,
    config: config
};
