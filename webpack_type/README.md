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
    - 打包css，以link的形式单文件插入到html中，并启用压缩；
    - 打包less，编译成css，并启用压缩；
    - 打包js，去除空格、注释，es6语法转换成es5，并进行混淆压缩；
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
    ├─ config
    │      dir_config.js //引用路径的配置文件
    │      
    ├─ dist       //打包后生成的目录
    │              
    └─ src       //开发用的源代码
        ├─html   //放html文件
        │      
        └─js     //放js文件


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

        Tips：css文件重命名可以带上hash后缀，即
                原：new ExtractTextPlugin('css/[name].css')
                新：new ExtractTextPlugin('css/[name]-[hash].css')

            这里有个坑，ExtractTextPlugin文档里写的是[name]-[contenthash].css，
            而写contenthash打包的时候会报错，写hash就正常了。

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

5、html公共模板引入

    这里需要先将html-loader从webpack.config.js的module.rules中剥离
    html-loader和webpack自带的ejs语法有冲突。
    因此，第3点，处理图片中的rule应当这样写
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
                //{
                //    test: /\.(htm|html)$/i,
                //    use:"html-url-loader" 
                //},
                ...
            ]
        },
        
html分为两种，一种是主html页面，一种是html片段

    html片段是被引入到主html页面的，在打开浏览器时访问的是主html页面。
    这点需要区分开。
    （1）以下是一个主html页面的示例，
        index.html
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
                <%= require('html-loader!./html/header.html') %>
                <h2>主页22111</h2>
            </body>
            </html>
    
    （2）以下是一个html片段的示例，不需要body、html、head这些标签
        header.html
            <h1>This is header , hello world</h1>


在主html页面中引入html片段和img：

    index_1.html
        <div>
            <%= require('html-loader!./header.html') %>
        </div>
        <img src="<%= require('../img/card_1-line3.gif') %>" alt="">

在html片段中引入img

    因为html-loader和webpack冲突的关系，需要使用绝对路径，注意
        <img src="/assets/img/579eb391a7da9.jpg" alt="">

    6、webpack 4.x 新规则

        混淆压缩js文件，压缩css文件
            // 用于压缩css文件
            const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
            // 用于压缩js文件
            const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
            module.exports = {
                ...,
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

##  用法

    2019-3-28 09:46:09
    修复了html-loader加载图片打包后路径错误的bug
    调整了项目结构
        1、修复了img引入路径错误的bug
        2、调整了dev-server的路径配置
    
    2019-3-4 15:58:27
    大幅度修改了文件路径配置的数据结构，PAGE_NAME、JS_NAME进行了合并，
    注意，这里的name都是指的是主html页面，html片段不需要写入。
        const fileMap = {
            ROUTER:[
                { 
                    name:'index_1',
                    js:['index_1','utils'],
                },
                {
                    name:'index_2',
                    js:'index_2'
                },
            ],
            // dev目录配置项
            DEV:{
                base:'src',     //开发环境根目录
                folder:'html',  //存放html文件的文件夹名
                js_folder:'js'  //存放js文件的文件夹名
            },
            // prod目录配置项
            BUILD:{
                base:'dist',
                folder:'html',
                js_folder:'js',
                css_folder:'css'  //存放css文件的文件夹名
            },
        }



    2018-9-21 11:32:29 
        创建了html文件之后，放到src文件夹

            默认的src结构是这样的
                assets  assets用来放插件，
                    在打包时，assets里面的东西会全部原样复制到打包文件夹
                img     图片文件放在这里
                html    html文件放在这里
                css     css文件放在这里
                less    less文件放在这里
                js      js文件放这里

            （用法参见最新版）随着开发创建的文件增多，需要加入一些配置
                /config/name_config.js

                const fileMap = {
                    PAGE_NAME:[
                        //写入html文件夹里面的所有html文件名称
                    ],
                    JS_NAME:[
                        //写入js文件夹里面所有的js文件的名称
                    ],
                    ...
                }
            
                Tips：注意，PAGE_NAME和JS_NAME的元素应该是一一对应的。
                    也就是说，PAGE_NAME第n个元素，会对应到JS_NAME的第n个元素
                    JS_NAME的元素是PAGE_NAME的入口文件。
                    所以，每一个html文件都必定需要一个js入口文件。

                其他的设置，可改可不改。
                每次新创建了一个html文件和其对应js入口，都应当在name_config.js中注册
                js入口可多个，写名字的时候写数组。

                eg:
                    PAGE_NAME:[
                        "index_1",
                        "index_2"
                    ],
                    其中，如果index_1.html的入口文件叫做index_1.js
                    而index_2的入口文件有两个，一个叫utils.js，一个叫index_2.js
                    于是JS_NAME就这样写：

                    JS_NAME:[
                        "index_1",
                        ["index_2","utils"],
                    ],


    