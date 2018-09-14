var gulp = require('gulp');

var fs = require("fs");

//remove用于批量移动文件和文件夹
var REMOVE = require("./remove-folder.js");

var minifyCss = require('gulp-minify-css');/* 压缩css */
var htmlmin = require('gulp-htmlmin');/* 压缩html */
var uglify = require('gulp-uglify');/* 压缩js */

var babel = require('gulp-babel'); /* 转换es6 */

var gutil = require("gulp-util");/* 压缩js时，js报错需要log */

var clean = require('gulp-clean');/* 清空文件夹 */

var gulpSequence = require('gulp-sequence');

/* url 配置 */
var BASE_URL = 'src';
var FILE_DIR = {
  js:BASE_URL + '/js/**/*.js',
  css:BASE_URL + '/css/*.css',
  html:BASE_URL + '/html/*.html',
  assets:'/assets',
  output:'dist'
}

// 1、清除原有的build文件夹
gulp.task('_clean',function(cb){
    return gulp.src( FILE_DIR.output+"",{read:false} )
      .pipe(clean());
});

// 2、创建文件夹
gulp.task('_init_dir',()=>{
    return new Promise(function(resolve,reject){
        fs.mkdir(FILE_DIR.output,function(err){
          if(err)
            console.error(err);
          console.log('create dir success');
          resolve(resolve);
        })
    }).then(function(resolve){
      fs.mkdir(FILE_DIR.output+FILE_DIR.assets,function(err){
          if(err)
            console.error(err);
          console.log('create assets dir success');
          resolve();
        });
    })
})

// 2、复制资源文件
gulp.task('_copy_assets',function(){
    return new Promise(function(resolve,reject){
      REMOVE.copyFolder(BASE_URL+FILE_DIR.assets, FILE_DIR.output+FILE_DIR.assets, function(err) {
        if (err) 
          console.log(err);
        console.log('copy assets success');
        resolve();
      })
    })
})

// 3、压缩js
gulp.task("_minifyjs",function(){
    return gulp.src(FILE_DIR.js, { base: BASE_URL })
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(uglify()).on('error', function (err) {
          gutil.log(gutil.colors.red('[Error]'), err.toString());
      })
      .pipe(gulp.dest(FILE_DIR.output)); 
})

// 4、压缩css
gulp.task("_minifycss",function(){
    return gulp.src(FILE_DIR.css, { base: BASE_URL })
      .pipe(minifyCss())
      .pipe(gulp.dest(FILE_DIR.output)); 
})

// 5、压缩html
gulp.task("_minifyhtml",function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true,//压缩页面CSS
        processScripts:["text/html"]
    };
    return gulp.src(FILE_DIR.html, { base: BASE_URL })
      .pipe(htmlmin(options))
      .pipe(gulp.dest(FILE_DIR.output));
})


//定义命令任务
gulp.task('default',function(cb){
  gulpSequence(
    '_clean',
    '_init_dir',
    '_copy_assets',
    '_minifyjs',
    '_minifycss',
    '_minifyhtml')(cb);
})