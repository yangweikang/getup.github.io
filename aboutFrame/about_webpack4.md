```json
// package.json 
{
  "name": "frame-v2.0.0",
  "version": "2.0.0",
  "description": "前端框架", 
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --mode development ",
    "build": "cross-env NODE_ENV=production webpack --mode production"
  },
  "author": "ywkang",
  "license": "ISC",
  "devDependencies": {//调试依赖
    "babel-core": "^6.26.3",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.4",
    "babel-plugin-component": "^1.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-plugin-transform-vue-jsx": "^3.7.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "cross-env": "^5.2.0",
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "friendly-errors-webpack-plugin": "^1.7.0",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.0.4",
    "less-loader": "^4.1.0",
    "mini-css-extract-plugin": "^0.4.1",
    "optimize-css-assets-webpack-plugin": "^4.0.3",
    "progress-bar-webpack-plugin": "^1.11.0",
    "purify-css": "^1.2.5",
    "purifycss-webpack": "^0.7.0",
    "style-loader": "^0.21.0",
    "url-loader": "^1.0.1",
    "vue-loader": "^15.2.4",
    "vue-template-compiler": "^2.5.16",
    "webpack": "^4.14.0",
    "webpack-cli": "^3.0.8",
    "webpack-dev-server": "^3.1.4",
    "webpack-manifest-plugin": "^2.0.3",
    "webpack-merge": "^4.1.3"
  },
  "dependencies": {//生产依赖
    "axios": "^0.18.0",
    "echarts": "^4.1.0",
    "element-ui": "^2.4.2",
    "jquery": "^3.3.1",
    "md5": "^2.2.1",
    "qs": "^6.5.2",
    "vue": "^2.5.16",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  }
}
```
# webpack4 构架工具
//base
```js
const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {//垫片，入口，引入
        'main': ['babel-polyfill', './scripts/main.js', './scripts/polyfill.js'],
        'jquery': ['jquery'],
        'echarts': ['echarts']
    },
    context: path.join(process.cwd(), 'app'),
    resolve: {//优先匹配后缀
        extensions: ['.vue', '.js', '.css', '.less']
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            )
        }, {
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                "css-loader"
            ]
        }, {
            test: /\.less$/,
            use: [
                devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
                "less-loader"
            ]
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|swf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: './images/[name].[ext]'
                }
            }]
        }]
    },
    optimization: {//公共提取，代码分割提取
        runtimeChunk: {
            name: "manifest",
        },
        splitChunks: {
            cacheGroups: {
                echarts: {
                    test: 'echarts',
                    name: 'echarts',
                    chunks: 'initial'
                },
                jquery: {
                    test: 'jquery',
                    name: 'jquery',
                    chunks: 'initial'
                },
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash:8].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: './favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new ManifestPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new ProgressBarPlugin()
    ]
};
```
//dev
```js
const webpack = require('webpack');
const webpackCommon = require('./webpack.common');
const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const port = 8081;
module.exports = webpackMerge(webpackCommon, {
    devtool: 'source-map',
    devServer: {
        hot: true, //热加载  
        historyApiFallback: true,
        host: 'localhost',
        compress: false, // 服务器返回浏览器的时候是否启动gzip压缩 
        inline: true, // 文件改变自动刷新页面
        progress: false, // 显示编译进度 
        port: port, // 服务器端口 
        stats: 'minimal',
        quiet: true,
        noInfo: true,
        clientLogLevel: 'none',
        overlay: {
            errors: true
        },
        proxy: [ 
            {
                context: ['/'],
                target: 'http://10.48.186.11:8999',
                changeOrigin: true,
                secure: false
            }
        ]
    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 300, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数 
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //HMR
        new webpack.NamedModulesPlugin(), // HMR
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${port}`], 
                clearConsole: true
            }
        })
    ]
});
```