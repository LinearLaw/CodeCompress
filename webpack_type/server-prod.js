const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname,"./dist")));

app.listen(5432,()=>{
    console.log(`端口号5432，prod-server已就位`);
})