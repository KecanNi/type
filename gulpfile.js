var gulp=require('gulp');
var sass = require('gulp-sass');  //编译scss
var autoprefixer = require('gulp-autoprefixer');  //自动添加前缀
var clean = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat');  //合并文件
var uglify = require('gulp-uglify');  //压缩js
var babel = require('gulp-babel');   //es6 ----> es5
var htmlmin = require('gulp-htmlmin');  //压缩html插件
var server = require('gulp-webserver');  //起服务

var url=require('url');
var fs=require('fs');
var path=require('path');
var querystring=require('querystring');

//SCSS
gulp.task('scss',function(){
    return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            // .pipe(autoprefixer({
            //     browsers:['last 2 versions','Andriod>=4.0']
            // }))
            .pipe(concat('index.css'))
            .pipe(gulp.dest('./src/css'))
})