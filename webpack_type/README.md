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
    │  └─pages
    │      ├─index_1
    │      │      index_1-bundle.js
    │      │      index_1.html
    │      │      
    │      ├─index_2
    │      │      index_2-bundle.js
    │      │      index_2.html
    │      │      
    │      └─index_3
    │              index_3-bundle.js
    │              index_3.html
    │              
    └─src       //开发用的源代码
        ├─html  //放html文件
        │      
        └─js    //放js文件