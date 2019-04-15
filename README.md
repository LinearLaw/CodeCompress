# 页面打包

页面打包项目
    
    在vue、angular、react框架大行其道之时，它们相关的cli给开发带来了极大便利，
    但是，并非所有的项目都需要vue、angular、react，
    那么，脱离cli脚手架之后，以往传统的html、css、js三件套项目应当如何打包？

    本项目将从这里出发进行探讨。

## 现状
    
目前一共增加了三个目录（history除外）

    /gulp_type → 使用gulp对html进行打包    
        适用范围：
            - 压缩html、js、css

    /webpack_babel → 使用webpack对es6语法进行打包

    /webpack_type → 当我有多个html，多个js文件时，webpack的打包方式
        目前已支持：
            - 支持多个html页面，支持多个js文件，批量打包；
            - 打包html，去除空格、注释，插入相应的js文件，打包其中的img标签；
            - 打包css，以link的形式单文件插入到html中，并启用压缩；
            - 打包less，编译成css，并启用压缩；
            - 打包js，去除空格、注释，es6语法转换成es5，并进行混淆压缩；
            - 打包图片文件，小于某个大小值的图片将会解析为base64格式文件，
                大于这个值将以单文件形式发布；
            - 引用的资源将会被完整复制到生产环境的代码中；