/*
    ROUTER:every html file and its js file
    DEV : develop environment file config
    BUILD: production environment file config 

 */

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
    {
      name:'index_3',
      js:'index_3'
    }
  ],
  // dev目录配置项
  DEV:{
    base:'src',
    folder:'html',  //存放html文件的文件夹名
    js_folder:'js'  //存放js文件的文件夹名
  },
  BUILD:{
    base:'dist',
    folder:'html',
    js_folder:'js',
    css_folder:'css'  //存放css文件的文件夹名
  },
}
// const fileMap = {
//   PAGE_NAME:[
//     "index_1",
//     "index_2",
//     "index_3",
//   ],
//   JS_NAME:[
//     ["index_1","utils"],
//     "index_2",
//     "index_3",
//   ],
//   dev:{
//     BASE:"src",
//     PAGE_FOLDER:"html",  //存放html文件的文件夹名
//     JS_FOLDER:"js",   //存放js文件的文件夹名
//   },
//   build:{
//     BASE:"dist",
//     PAGE_FOLDER:"html",  //存放html文件的文件夹名
//     JS_FOLDER:"js",   //存放js文件的文件夹名
//     CSS_FOLDER:"css"  //存放css文件的文件夹名
//   }
// }


module.exports = fileMap;