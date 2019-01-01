var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var autoprefixer = require('gulp-autoprefixer'); //自动添加前缀
var clean = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat'); //合并文件
var uglify = require('gulp-uglify'); //压缩js
var babel = require('gulp-babel'); //es6 ----> es5
var htmlmin = require('gulp-htmlmin'); //压缩html插件
var server = require('gulp-webserver'); //起服务

var url = require('url');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var data = require('./src/data/data.json')
//SCSS
gulp.task('scss', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        // .pipe(autoprefixer({
        //     browsers:['last 2 versions','Andriod>=4.0']
        // }))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./src/css'))
})
//监听scss
gulp.task('watch', function () {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'));
})

function serverFun(servers) {
    return gulp.src(servers)
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function (req, res, next) {
                var pathname = url.parse(req.url).pathname;
                
                if (pathname === '/favicon.ico') {
                    return res.end('')
                }
                if (pathname === '/api/list') {
                    var src = '';
                    req.on('data', function (chunk) {
                        src += chunk;
                       
                    })
                    req.on('end', function () {
                        var params = querystring.parse(src); 
                        fs.writeFileSync('./src/data/data.json',JSON.stringify(params));
                        res.end(JSON.stringify({
                            code: 1,
                            data: params
                        }))
                    })
                } else {
                   
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, servers, pathname)))
                }
            }
        }))
}
gulp.task('server',function(){
    return serverFun('src')
})
//开发环境
gulp.task('dev',gulp.series('scss',"server","watch"))

/* -------------------------------------------- */
//压缩js
gulp.task('bUglify',function(){
    return gulp.src(['./src/js/**/*.js'])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})

//压缩html

gulp.task('bHtmlmin',function(){
    return gulp.src('./src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build'))
})

//css
gulp.task('bCss',function(){
    return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./build/css'))
})
//压缩图标
gulp.task('bFont', function () {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./build/fonts'))
})
//服务
gulp.task('bServer',function(){
    return serverFun('build')
})

//线上环境
gulp.task('build',gulp.series('bUglify',"bHtmlmin",'bCss','bFont'))
// gulp.task('build',gulp.series('bUglify','bHtmlmin','bCss'))