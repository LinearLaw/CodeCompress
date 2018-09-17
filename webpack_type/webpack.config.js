const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//for make css style output a single file but not a style tag, use extract text webpack plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin' );

const CFG = require("./config/dir_config.js");


let entryArr = CFG.JS_CONFIG.JS_DIR;
module.exports = {
    mode:"production",
    entry:entryArr, 
    output:{
        path:path.resolve(__dirname, CFG.BUILD_DIR.base),
        filename:'pages/[name]/[name]-bundle.js',
        //publicPath 表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        // publicPath: '/assets/',
    },
    module:{ 
        rules:[
            // 不使用extract-text-webpack-plugin时，import的css将会加入到html的style标签里
            // {
            //     test:/\.css$/,
            //     use:['style-loader','css-loader']
            // },
            /* css和less的打包规则，使用style-loader、css-loader、less-loader */
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
        ]
    },

    plugins:[
        new CleanWebpackPlugin( CFG.BUILD_BASE ),
        new ExtractTextPlugin('css/[name].css'),
        ...CFG.PAGE_CONFIG.PAGE_NAME.map((_it,_in)=>{
            var _chunks = typeof CFG.JS_CONFIG.JS_NAME[_in]=="string"?[ CFG.JS_CONFIG.JS_NAME[_in] ]:[...CFG.JS_CONFIG.JS_NAME[_in]];
            return new HtmlWebpackPlugin({
                chunks:_chunks, //添加引入的js,也就是entry中的key
                filename:`pages/${_chunks[0]}/${_it}.html`,//打包后的html名称
                minify:{
                    collapseWhitespace:true //折叠空白区域 也就是压缩代码
                },
                hash:true,
                title:'I love China',
                template: CFG.PAGE_CONFIG.PAGE_DIR[_in] //模板地址
            })
        }),
    ]
}