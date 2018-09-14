// js file dir
const JS_CONFIG = {
  JS_NAME:[
    "index_1",
    "index_2",
    "index_3",
  ],
  JS_DIR:[],
  DIR_BASE:"js"
};
JS_CONFIG.JS_DIR = JS_CONFIG.JS_NAME.map((it,_in)=>{
    return `./${BASE_URL}/${JS_CONFIG.DIR_BASE}/${it}.js`
})