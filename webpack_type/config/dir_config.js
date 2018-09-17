const BASE_URL = "src"

// page dir
const PAGE_CONFIG = {
  PAGE_NAME:[
    "index_1",
    "index_2",
    "index_3",
  ],
  PAGE_DIR:[],
  DIR_BASE:"html"
};
PAGE_CONFIG.PAGE_DIR = PAGE_CONFIG.PAGE_NAME.map((it,_in)=>{
    return `${BASE_URL}/${PAGE_CONFIG.DIR_BASE}/${it}.html`
})

// js file dir
//js file name can input a string , signed file name, this file is the entry file of current html 
//if need import multiple entry , input a array and its elements is entry file's name 
//default js file direction is src/js/
const JS_CONFIG = {
  JS_NAME:[
    ["index_1","utils"],
    "index_2",
    "index_3",
  ],
  JS_DIR:{},
  DIR_BASE:"js"
};
JS_CONFIG.JS_NAME.map((it,_in)=>{
    if(typeof it == "string"){
      JS_CONFIG.JS_DIR[it] = `./${BASE_URL}/${JS_CONFIG.DIR_BASE}/${it}.js`;
    }else{
      JS_CONFIG.JS_DIR[it[0]] = it.map((_int,_inn)=>{
        return `./${BASE_URL}/${JS_CONFIG.DIR_BASE}/${_int}.js`
      });
    }
})

// build dir
const BUILD_BASE = "dist"
const BUILD_DIR = {
  base:BUILD_BASE,
  js:`${BUILD_BASE}/js`,
  html:`${BUILD_BASE}/html`
}

module.exports = {
  PAGE_CONFIG,
  JS_CONFIG,
  BUILD_DIR
}


