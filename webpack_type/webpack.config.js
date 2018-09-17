const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CFG = require("./config/dir_config.js");

 
let entryArr = {};
CFG.JS_CONFIG.JS_NAME.map((_it,_in)=>{
    entryArr[_it] = CFG.JS_CONFIG.JS_DIR[_in]
})

module.exports = {
    mode:"production",
    // entry:{
    //     // index: './src/index.js',
    //     // index2: './src/index2.js',
    // }, 
    entry:entryArr,
    output:{
        path:path.resolve(__dirname, CFG.BUILD_DIR.base),
        //filename前面我们可以使用一个变量[name],这个就表示获取entry里面的key作为文件名加在前面
        //打出来是index-bundle.js
        //和index2-bundle.js
        // filename:'[name]-bundle.js' 
        filename:'pages/[name]/[name]-bundle.js' 
    },
    plugins:[
        ...CFG.PAGE_CONFIG.PAGE_NAME.map((_it,_in)=>{
            return new HtmlWebpackPlugin({
                chunks:[ CFG.JS_CONFIG.JS_NAME[_in] ], //添加引入的js,也就是entry中的key
                filename:`pages/${CFG.JS_CONFIG.JS_NAME[_in]}/${_it}.html`,
                minify:{
                    collapseWhitespace:true //折叠空白区域 也就是压缩代码
                },
                hash:true,
                title:'I love China',
                template: CFG.PAGE_CONFIG.PAGE_DIR[_in] //模板地址
            })
        }),
        // new HtmlWebpackPlugin({
        //     chunks:['index2'], //添加引入的js,也就是entry中的key
        //     filename:'index2.html',
        //     minify:{
        //         collapseWhitespace:true //折叠空白区域 也就是压缩代码
        //     },
        //     hash:true,
        //     title:'第二个页面',
        //     template: './src/index2.html' //模板地址
        // })
    ]
}