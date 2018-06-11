//引入gulp插件
var gulp = require('gulp');
var server = require('gulp-webserver');
var less = require('gulp-less');
var fs = require('fs');
var path = require('path');
// var scss = require('gulp-scss');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var url = require('url');
//压缩js
gulp.task('minjs', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});
//压缩css
gulp.task('mincss', function() {
    gulp.src('src/css/*.css')
        .pipe(less())
        .pipe(clean())
        .pipe(gulp.dest('dist/css'))
});
//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 6060,
            host: 'localhost',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false
                }
                var pathname = url.parse(req.url, true).pathname;
                pathname === pathname === "/" ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
});
//监听
gulp.task('change', function() {
    gulp.watch(['src/css/*.css', 'src/js/*.js'], ['mincss', 'minjs'])
})