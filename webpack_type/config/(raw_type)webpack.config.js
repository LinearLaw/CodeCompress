const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin' );

module.exports = {
    mode:"production",
    entry:{
        index: './src/index.js',
        index2: ['./src/index2.js'],
    }, 
    output:{
        path:path.resolve(__dirname, "dist"),
        //filename前面我们可以使用一个变量[name],这个就表示获取entry里面的key作为文件名加在前面
        // filename:'[name]-bundle.js' 
        filename:'pages/[name]/[name]-bundle.js' 
    },
    module:{ 
        rules:[
            // 不使用extract-text-webpack-plugin时，import的css将会加入到html的style标签里
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin( CFG.BUILD_BASE ),
        new HtmlWebpackPlugin({
            chunks:['index'], //添加引入的js,也就是entry中的key
            filename:'index.html',
            minify:{
                collapseWhitespace:true //折叠空白区域 也就是压缩代码
            },
            hash:true,
            title:'第一个页面',
            template: './src/index.html' //模板地址
        }),
        new HtmlWebpackPlugin({
            chunks:['index2'], 
            filename:'index2.html',
            minify:{
                collapseWhitespace:true 
            },
            hash:true,
            title:'第二个页面',//模板地址
        })
    ]
}