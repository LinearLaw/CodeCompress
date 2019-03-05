
const fileMap = require( "./name_config.js");

let defaultPage = {
  PAGE_NAME:[],
  PAGE_DIR:[],
  JS_NAME:[],
  JS_DIR:{}
}

fileMap.ROUTER.map((item,index)=>{
  defaultPage['PAGE_NAME'].push(item.name);
  defaultPage['PAGE_DIR'].push(`${fileMap.DEV.base}/${fileMap.DEV.folder}/${item.name}.html`);
  defaultPage['JS_NAME'].push(item.js);

  if(item.js){
    if(typeof item.js == "string"){
      defaultPage['JS_DIR'][item.js] = `./${fileMap.DEV.base}/${fileMap.DEV.js_folder}/${item.js}.js`;
    }else{
      defaultPage['JS_DIR'][item.js[0]] = item.js.map((_int,_inn)=>{
        return `./${fileMap.DEV.base}/${fileMap.DEV.js_folder}/${_int}.js`
      });
    }
  }
  
})

// build dir
const BUILD_DIR = fileMap.BUILD;
const DEV_DIR = fileMap.DEV;

module.exports = {
  PAGE_CONFIG:defaultPage,
  BUILD_DIR,
  DEV_DIR
}


