'use strict';

var gulp = require('gulp');
// var cached = require('gulp-cached');
var path = require('path');
gulp.fs = require("fs");
gulp.autoprefixer = require('gulp-autoprefixer');
gulp.cssnano = require('gulp-cssnano');
gulp.connect = require('gulp-connect-multi')();
gulp.jade = require('gulp-jade');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var errorNotifier = require('gulp-error-notifier');

// var svgmin = require('gulp-svgmin');
// var svgstore = require('gulp-svgstore');
// var rename = require('gulp-rename');

/* watch document change */
gulp.paths = {
    scripts: 'dev/**/*.js',
    jade: 'dev/**/*.jade',
    style: ['dev/jade/**/*.less', 'dev/styles/**/*.less'],
    html: 'dev/assets/main.html',
    js: 'dev/assets/js/*.js',
    ccs: 'dev/assets/css/*.css'
};

gulp.task('server', gulp.connect.server({
  root: ['dev/assets'],
  port: 9000,
  open: {
    file: 'main.html'
    // browser: 'chrome'
  },
  livereload: true
}));

gulp.task('jade', function() {
    gulp.src('dev/*.jade')
        .pipe(errorNotifier())
        .pipe(gulp.jade({
            pretty: true
        }))
        .pipe(gulp.dest('dev/assets'))
        // .pipe(gulp.connect.reload());
});

// gulp.task('svgstore', function () {
//     return gulp
//         .src('dev/svg/*.svg')
//         .pipe(svgmin(function (file) {
//             var prefix = path.basename(file.relative, path.extname(file.relative));
//             return {
//                 plugins: [{
//                     cleanupIDs: {
//                         prefix: prefix + '-',
//                         minify: true
//                     }
//                 }]
//             }
//         }))
//         .pipe(svgstore())
//         .pipe(gulp.dest('dev/assets/images'));
// });

gulp.task('concat', function () {
    return gulp.src('dev/styles/style.less')
        .pipe(errorNotifier())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gulp.autoprefixer({browsers: ['last 10 versions','ie >= 9']}))

        // .pipe(gulp.cssnano())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dev/assets/css'))
        .pipe(gulp.connect.reload());
});

// gulp.task('css', function () {
//   gulp.src('dev/assets/css/*.css')
//     .pipe(gulp.connect.reload());
// });

gulp.task('html', function () {
  gulp.src(gulp.paths.html)
    .pipe(gulp.connect.reload());
});

gulp.task('js', function () {
  gulp.src(gulp.paths.js)
    .pipe(gulp.connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(gulp.paths.style, ['concat']);
    gulp.watch(gulp.paths.jade, ['jade']);
    gulp.watch(gulp.paths.css, ['css']);
    // gulp.watch(gulp.paths.html, ['html']);
    gulp.watch(gulp.paths.js, ['js']);
});

gulp.task('default', ['concat', 'jade', 'server', 'watch']);