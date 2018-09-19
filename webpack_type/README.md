# webpack 打包多页面

    全局安装webpack
        npm i webpack -g

    全局安装webpack开发微服务
        npm i webpack-dev-server -g

    安装项目依赖
        npm i 

    运行
        npm run dev

    打包
        npm run build

#   已实现的功能

    - 支持多个html页面，支持多个js文件，批量打包；
    - 打包html，去除空格、注释，插入相应的js文件，打包其中的img标签；
    - 打包css，以link的形式单文件插入到html中；
    - 打包less，编译成css；
    - 打包js，去除空格、注释，es6语法转换成es5；
    - 打包图片文件，小于某个大小值的图片将会解析为base64格式文件，
        大于这个值将以单文件形式发布；
    - 引用的资源将会被完整复制到生产环境的代码中；


## 项目配置

    源代码放在src文件夹中，打包后的代码放在dist文件夹中

    webpack_type
    │  package-lock.json
    │  package.json
    │  README.md
    │  webpack.config.js
    │  
    ├─config
    │      dir_config.js //引用路径的配置文件
    │      
    ├─dist       //打包后生成的目录
    │              
    └─src       //开发用的源代码
        ├─html  //放html文件
        │      
        └─js    //放js文件


##  webpack填坑

1、多页面多入口

    like this:

        const path = require('path');

        //html-webpack-plugin用于给html插入js文件
        const HtmlWebpackPlugin = require('html-webpack-plugin');

        //clean-webpack-plugin用户删除原有的打包文件
        const CleanWebpackPlugin = require('clean-webpack-plugin' );

        module.exports = {
            mode:"production",

            //多入口，配置多个key和value
            entry:{
                index: './src/index.js',
                index2: ['./src/index2.js'],
            }, 
            output:{
                path:path.resolve(__dirname, "dist"),
                //filename前面使用一个变量[name]
                //这个就表示获取entry里面的key作为文件名加在前面
                filename:'js/[name]-bundle.js' 
            },
            module:{ 
                rules:[
                    // 不使用extract-text-webpack-plugin时，
                    // import的css将会加入到html的style标签里
                    {
                        test:/\.css$/,
                        use:['style-loader','css-loader']
                    },
                ]
            },
            plugins:[
                new CleanWebpackPlugin( CFG.BUILD_BASE ),

                // 每一个js的入口都会对应一个html文件，
                // 因此需要写多个new HtmlWebpackPlugin
                new HtmlWebpackPlugin({
                    chunks:['index'],   //添加引入的js,也就是entry中的key
                    filename:'page/index.html',
                    minify:{
                        collapseWhitespace:true //折叠空白区域 也就是压缩代码
                    },
                    hash:true,

                    //可以给页面加参数，比如title
                    // 在html中引用： <%= htmlWebpackPlugin.options.title %>
                    title:'第一个页面', 

                    template: './src/index.html' //模板地址
                }),
                new HtmlWebpackPlugin({
                    chunks:['index2'], 
                    filename:'page/index2.html',
                    minify:{
                        collapseWhitespace:true 
                    },
                    hash:true,
                    title:'第二个页面',//模板地址
                })
            ]
        }

2、处理css、less

    处理css有两种方式，
        第一种方式是以js文件的import来存在的css方式，
            这种方式打包后，import进来的css会变成一个style标签插入到html中
        第二种方式是将css打包成单独文件的方式，
            这种方式打包后，css文件将使用link标签引入到html中

    第一种：
        module:{ 
            rules:[
                // 不使用extract-text-webpack-plugin时，
                // import的css将会加入到html的style标签里
                {
                    test:/\.css$/,
                    use:['style-loader','css-loader']
                },
            ]
        },

        Tips：使用webpack时，需要加载style-loader和css-loader这两个包
            npm i style-loader -D
            npm i css-loader -D

    第二种，首先引入一个extract-text-webpack-plugin的插件

        const ExtractTextPlugin = require('extract-text-webpack-plugin');
        ...
        module.exports = {
            ...
            module:{
                rules:[
                    {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            use: "css-loader"
                        })
                    },
                    //处理less文件
                    {
                        test: /\.less$/i,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'less-loader']
                        })
                    },
                ]
            }
            ...

            plugins:[
                ...
                new ExtractTextPlugin('css/[name].css'),
                ...
            ]
        }

        Tips：如果需要处理less文件，除了css-loader和style-loader外，
            还需要less-loader和less两个包
            npm i less-loader -D
            npm i less -D

3、处理图片文件

    处理图片需要url-loader、html-url-loader两个包
        url-loader用来解析图片url，
        html-url-loader用来专门打包img标签中的src引入的图片

        module:{ 
            rules:[
                ...
                {
            　　　　　　 test: /\.(png|svg|jpg|gif)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:8].[ext]',
                        //这里的publicPath用来给图片指定根目录路径
                        publicPath:"../"
                    }
            　　　},
                {
                    test: /\.(htm|html)$/i,
                    use:"html-url-loader" 
                },
                ...
            ]
        },

4、处理es6
    
    es6是要单独处理的，需要使用babel。
    安装依赖
        npm i babel-loader @babel/core -D
        npm i @babel/preset-env -D
        
    .webpack.config.js
        module:{ 
            rules:[
                ...
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader"
                    }
                }
                ...
            ]
        },

    .babelrc
        { 
            "presets": ["@babel/preset-env"]
        }

    Tips：babel在7.0版本开始，名字为@babel，7.0版本之前叫做babel
        例如7.0以前的babel-preset-env，7.0后叫做@babel/preset-env



    