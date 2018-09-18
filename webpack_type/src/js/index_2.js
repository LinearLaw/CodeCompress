

import "../less/index_2.less"
// import "./utils.js"
// import $ from "../assets/jquery/jquery-1.12.4.min.js"

// page dir
const BASE_URL = "";
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

console.log("page index 2");
