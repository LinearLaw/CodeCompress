const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//for make css style output a single file but not a style tag, use extract text webpack plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin' );

// 用于压缩css文件，webpack 4.x新增的东西
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 用于压缩js文件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const config = require("./config/dir.middleware.js");

module.exports = {
    mode:"production",
    entry:config.PAGE_CONFIG.JS_DIR, 
    output:{
        path:path.resolve(__dirname, config.BUILD_DIR.base),
        filename:`${config.BUILD_DIR.js_folder}/[name]-bundle.js`,
        //publicPath 表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        // publicPath: 'assets/',
    },
    module:{ 
        rules:[
            /* css和less的打包规则，使用style-loader、css-loader、less-loader */
            {
                test:  /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options:{
                            minimize: true //css压缩
                        }
                    },'less-loader']
                })
            },
            {
        　　　　　　 test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]',
                    publicPath:"../"
                    // publicPath:path.resolve(__dirname,"dist/")
                }
        　　　},
            // {
            //     test: /\.(htm|html)$/i,
            //     use:["html-loader"]
            // },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },

    plugins:[
        new CleanWebpackPlugin( path.resolve(__dirname ,config.BUILD_DIR.base) ),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname , `${config.DEV_DIR.base}/assets`),
            to:path.resolve(__dirname , `${config.BUILD_DIR.base}/assets`)
        }]),
        new ExtractTextPlugin({
            filename:`${config.BUILD_DIR.css_folder}/[name]-[hash].css`,
            allChunks: true,
        }),

        ...config.PAGE_CONFIG.PAGE_NAME.map((_it,_in)=>{
            var _chunks = typeof config.PAGE_CONFIG.JS_NAME[_in]=="string"?[ config.PAGE_CONFIG.JS_NAME[_in] ]:[...config.PAGE_CONFIG.JS_NAME[_in]];
            return new HtmlWebpackPlugin({
                chunks:_chunks, //添加引入的js,也就是entry中的key
                filename:`${config.BUILD_DIR.folder}/${_it}.html`,//打包后的html名称
                minify:{
                    collapseWhitespace:true //折叠空白区域 也就是压缩代码
                },
                hash:true,
                title:'I love China',
                template: config.PAGE_CONFIG.PAGE_DIR[_in] //模板地址
            })
        }),
    ],
    optimization: {
        
        minimizer: [
            // 压缩js文件
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            // 压缩 css文件
            new OptimizeCSSPlugin({})
        ]
    }
}