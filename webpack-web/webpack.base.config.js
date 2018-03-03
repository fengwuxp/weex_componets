const path = require('path');
const os = require('os');
const {getBaseConfig} = require('./WebpackWebUtils');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat([
    'postcss'
]);

const webConfig = getBaseConfig({
    entry: {
        app: path.resolve('src', 'Main'),
    },
    output: {
        path: path.resolve(__dirname, 'dist_web'),
        filename: '[name].web.js'
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            cache: false,
            verbose: true,
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: 'css',
            verbose: true,
            cache: false,
            loaders: ['postcss-loader'],
            threadPool: happyThreadPool
        })
    ]
});

const weexVuePrecompiler = require('weex-vue-precompiler')();
const postcssPluginWeex = require('postcss-plugin-weex');
const autoprefixer = require('autoprefixer');
const postcssPluginPx2Rem = require('postcss-plugin-px2rem');

webConfig.module.rules[1].use.push({
    loader: 'vue-loader',
    options: {
        optimizeSSR: false,
        postcss: [
            postcssPluginWeex(),
            autoprefixer({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
            }),
            postcssPluginPx2Rem({rootValue: 75, minPixelValue: 1.01})
        ],
        compilerModules: [
            {
                postTransformNode: el => {
                    weexVuePrecompiler(el);
                }
            }
        ],
        loaders: {
            js: 'happypack/loader?id=babel',
            scss: 'vue-style-loader!css-loader!sass-loader'
        }
    }
});
module.exports = webConfig;
