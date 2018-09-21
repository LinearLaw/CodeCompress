
const fileMap = require( "./name_config.js");

// page dir
const PAGE_CONFIG = {
  PAGE_NAME:fileMap.PAGE_NAME,
  PAGE_DIR:fileMap.PAGE_NAME.map((it,_in)=>{
      return `${fileMap.dev.BASE}/${fileMap.dev.PAGE_FOLDER}/${it}.html`
  }),
};

// js file dir
//js file name can input a string , signed file name, this file is the entry file of current html 
//if need import multiple entry , input a array and its elements is entry file's name 
//default js file direction is src/js/
const JS_CONFIG = {
  JS_NAME:fileMap.JS_NAME,
  JS_DIR:{},
};
fileMap.JS_NAME.map((it,_in)=>{
    if(typeof it == "string"){
      JS_CONFIG.JS_DIR[it] = `./${fileMap.dev.BASE}/${fileMap.dev.JS_FOLDER}/${it}.js`;
    }else{
      JS_CONFIG.JS_DIR[it[0]] = it.map((_int,_inn)=>{
        return `./${fileMap.dev.BASE}/${fileMap.dev.JS_FOLDER}/${_int}.js`
      });
    }
});


// build dir
const BUILD_DIR = fileMap.build;
const DEV_DIR = fileMap.dev;

module.exports = {
  PAGE_CONFIG,
  JS_CONFIG,
  BUILD_DIR,
  DEV_DIR
}


