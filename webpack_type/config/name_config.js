/*
    PAGE_NAME:every html file name 
    JS_NAME:every js file name
    dev : develop environment file config
    build: production environment file config 

 */

const fileMap = {
  PAGE_NAME:[
    "index_1",
    "index_2",
    "index_3",
  ],
  JS_NAME:[
    ["index_1","utils"],
    "index_2",
    "index_3",
  ],
  dev:{
    BASE:"src",
    PAGE_FOLDER:"html",  //存放html文件的文件夹名
    JS_FOLDER:"js",   //存放js文件的文件夹名
  },
  build:{
    BASE:"dist",
    PAGE_FOLDER:"html",  //存放html文件的文件夹名
    JS_FOLDER:"js",   //存放js文件的文件夹名
    CSS_FOLDER:"css"  //存放css文件的文件夹名
  }
}


module.exports = fileMap;