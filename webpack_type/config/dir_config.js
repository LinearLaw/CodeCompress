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

// build dir
const BUILD_BASE = "dist"
const BUILD_DIR = {
  base:BUILD_BASE,
  js:`${BUILD_BASE}`,
  html:`${BUILD_BASE}/html`
}

module.exports = {
  PAGE_CONFIG,
  JS_CONFIG,
  BUILD_DIR
}


