const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin' );

const CFG = require("./config/dir_config.js");


let entryArr = CFG.JS_CONFIG.JS_DIR;
module.exports = {
    mode:"production",
    entry:entryArr, 
    output:{
        path:path.resolve(__dirname, CFG.BUILD_DIR.base),
        filename:'pages/[name]/[name]-bundle.js' 
    },
    module:{ 
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },

    plugins:[
        new CleanWebpackPlugin( CFG.BUILD_BASE ),
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