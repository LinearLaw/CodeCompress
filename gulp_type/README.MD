# Gulp compress html/css/js file

    先来看看需求：我在src上开发，html、css、js以及其他引用的公共库、图片等，
        我需要在上线的时候，将html、css、js都进行打包压缩，目录保持原样。

    也就是只需要进行压缩即可，不需要其他的什么。
    gulp足矣。

##  src目录

    js ——————> 里面每一个页面的js文件放入对应的文件夹，
            例如index.js放入/js/index/index.js
    css ——————> 在这里直接放在css下就行
    html ——————> 与css的规则一样
    assets ——————> 放入引用的公共库，js、img等

    gulp运行后，在src的同级目录会生成一个dist，
        里面的目录结构与src一致，js、css、html文件夹里面的内容进行了压缩处理

##  运行

    npm install --save-dev gulp-babel @babel/core @babel/preset-env
    
    全局安装gulp
        npm i gulp -g

    安装依赖
        npm i 

    执行打包
        gulp