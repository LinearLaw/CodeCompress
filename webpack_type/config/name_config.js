/*
    ROUTER:every html file and its js file
    DEV : develop environment file config
    BUILD: production environment file config 

 */

const fileMap = {
  ROUTER:[
    {
      name:'../index',
      js:'index_1'
    },
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


module.exports = fileMap;